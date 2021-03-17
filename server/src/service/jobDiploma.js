const _ = require("lodash");
const config = require("config");
const Sentry = require("@sentry/node");
const axios = require("axios");

const urlCatalogueSearch = `${config.private.catalogueUrl}/api/v1/es/search/convertedformation/_search/`;

const getDiplomasForJobs = async (romes) => {
  try {
    const body = {
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
    };

    const responseDiplomas = await axios.post(urlCatalogueSearch, body);

    let diplomas = [];

    responseDiplomas.data.aggregations.niveaux.buckets.forEach((diploma) => {
      diplomas.push(diploma.key);
    });

    return diplomas;
  } catch (err) {
    Sentry.captureException(err);

    let error_msg = _.get(err, "meta.body") ? err.meta.body : err.message;
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

module.exports = {
  getDiplomasForJobsQuery,
  getDiplomasForJobs,
};
