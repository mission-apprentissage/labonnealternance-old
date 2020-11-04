const express = require("express");
const logger = require("../../common/logger");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getElasticInstance } = require("../../common/esClient");
const _ = require("lodash");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await getRomesAndLabelsFromTitleQuery(req.query);
      return res.json(result);
    })
  );

  return router;
};

const getRomesAndLabelsFromTitleQuery = async (query) => {
  if (!query.title) return { error: "title_missing" };
  //else if (query.title.length < 3) return "title_too_short";
  else {
    const romes = await getLabelsAndRomes(query.title);
    return romes;
  }
};

const getLabelsAndRomes = async (searchKeyword) => {
  //console.log(romes, coords, radius, diploma);
  logger.info(searchKeyword);
  try {
    const esClient = getElasticInstance();

    const response = await esClient.search({
      index: "domainesmetiers",
      size: 10,
      _sourceIncludes: ["sous_domaine", "codes_romes"],
      body: {
        query: {
          bool: {
            must: {
              multi_match: {
                query: searchKeyword,
                fields: [
                  "domaine^3",
                  "sous_domaine^20",
                  "domaines^1",
                  "familles^1",
                  "mots_clefs^3",
                  "intitules_romes^5",
                ],
                type: "phrase_prefix",
                operator: "or",
              },
            },
          },
        },
      },
    });

    let labelsAndRomes = [];

    response.body.hits.hits.forEach((labelAndRome) => {
      labelsAndRomes.push({ label: labelAndRome._source.sous_domaine, romes: labelAndRome._source.codes_romes });
    });

    return { labelsAndRomes };
  } catch (err) {
    let error_msg = _.get(err, "meta.body") ? err.meta.body : err.message;
    console.log("Error getting romes from keyword ", error_msg);
    if (_.get(err, "meta.meta.connection.status") === "dead") {
      console.log("Elastic search is down or unreachable");
    }
    return { error: error_msg };
  }
};
