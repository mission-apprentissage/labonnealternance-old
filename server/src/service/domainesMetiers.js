const logger = require("../common/logger");
const { getElasticInstance } = require("../common/esClient");
const _ = require("lodash");
const { trackEvent } = require("../common/utils/sendTrackingEvent");

const getRomesAndLabelsFromTitleQuery = async (query) => {
  if (!query.title) return { error: "title_missing" };
  else {
    const romes = await getLabelsAndRomes(query.title);
    return romes;
  }
};

const getLabelsAndRomes = async (searchKeyword) => {
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

    if (searchKeyword.length > 3) {
      trackEvent({
        action: "Custom event",
        label: searchKeyword,
        category: "Moteur de recherche - Metier",
        value: labelsAndRomes.length,
      });
    }

    return { labelsAndRomes };
  } catch (err) {
    let error_msg = _.get(err, "meta.body") ?? err.message;

    if (_.get(err, "meta.meta.connection.status") === "dead") {
      logger.error(`Elastic search is down or unreachable. error_message=${error_msg}`);
    } else {
      logger.error(`Error getting romes from keyword. error_message=${error_msg}`);
    }

    return { error: error_msg };
  }
};

module.exports = {
  getRomesAndLabelsFromTitleQuery,
};
