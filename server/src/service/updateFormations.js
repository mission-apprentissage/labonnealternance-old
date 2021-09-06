//const logger = require("../common/logger");
//const { getDomainesMetiersES } = require("../common/esClient");
const _ = require("lodash");
const config = require("config");
const updateFormations = require("../jobs/importFormationsCatalogue/importFormationsCatalogue");
const Sentry = require("@sentry/node");

/*
const getLabelsAndRomes = async (searchKeyword) => {
  try {
    let terms = [];

    searchKeyword.split(" ").forEach((term, idx) => {
      if (idx === 0 || term.length > 2) {
        terms.push(getMultiMatchTerm(term));
      }
    });

    const esClient = getDomainesMetiersES();

    const response = await esClient.search({
      index: "domainesmetiers",
      size: 20,
      _sourceIncludes: ["sous_domaine", "codes_romes", "codes_rncps"],
      body: {
        query: {
          bool: {
            should: terms,
          },
        },
      },
    });

    let labelsAndRomes = [];

    response.body.hits.hits.forEach((labelAndRome) => {
      labelsAndRomes.push({
        label: labelAndRome._source.sous_domaine,
        romes: labelAndRome._source.codes_romes,
        rncps: labelAndRome._source.codes_rncps,
      });
    });

    //throw new Error("BOOOOOOOM");

    return { labelsAndRomes };
  } catch (err) {
    Sentry.captureException(err);
    let error_msg = _.get(err, "meta.body") ?? err.message;

    if (_.get(err, "meta.meta.connection.status") === "dead") {
      logger.error(`Elastic search is down or unreachable. error_message=${error_msg}`);
    } else {
      logger.error(`Error getting romes from keyword. error_message=${error_msg}`);
    }

    return { error: error_msg };
  }
};
*/
const updateFormationsQuery = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let onlyChangeMasterIndex = query.onlyChangeMasterIndex ? true : false;

      let result = await updateFormations({ onlyChangeMasterIndex });
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

module.exports = {
  updateFormationsQuery,
};
