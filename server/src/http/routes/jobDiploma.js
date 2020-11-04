const express = require("express");
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
      const result = await getDiplomasForJobsQuery(req.query);

      if (result === "romes_missing") res.status(400);
      else if (result.error) res.status(500);

      return res.json(result);
    })
  );

  const getDiplomasForJobs = async (romes) => {
    try {
      const esClient = getElasticInstance();

      const responseDiplomas = await esClient.search({
        index: "formations",
        body: {
          query: {
            match: {
              rome_codes: romes,
            },
          },
          aggs: {
            niveaux: {
              terms: {
                field: "niveau.keyword",
                size: 10,
              },
            },
          },
          size: 0,
        },
      });

      let diplomas = [];

      responseDiplomas.body.aggregations.niveaux.buckets.forEach((diploma) => {
        diplomas.push(diploma.key);
      });

      return diplomas;
    } catch (err) {
      let error_msg = _.get(err, "meta.body") ? err.meta.body : err;
      console.log("Error getting jobDiplomas from romes ", error_msg);
      if (_.get(err, "meta.meta.connection.status") === "dead") {
        console.log("Elastic search is down or unreachable");
      }
      return { error: error_msg };
    }
  };

  const getDiplomasForJobsQuery = async (query) => {
    //console.log("query : ", query);

    if (!query.romes) return "romes_missing";
    else {
      try {
        const diplomas = await getDiplomasForJobs(query.romes);
        return diplomas;
      } catch (err) {
        console.log("Error ", err.message);
        return { error: "internal_error" };
      }
    }
  };

  return router;
};
