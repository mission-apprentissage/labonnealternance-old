const logger = require("../common/logger");
const { getDiplomesMetiersES } = require("../common/esClient");
const _ = require("lodash");
const config = require("config");
const updateDiplomesMetiers = require("../jobs/diplomesMetiers/updateDiplomesMetiers");
const Sentry = require("@sentry/node");

const getDiplomasAndRomesQuery = async (query) => {
  if (!query.title) return { error: "title_missing" };
  else {
    const romes = await getDiplomasAndRomes(query.title);
    return romes;
  }
};

const getMultiMatchTerm = (term) => {
  return {
    bool: {
      must: {
        multi_match: {
          query: term,
          fields: [
            "sous_domaine^80",
            "appellations_romes^15",
            "intitules_romes^7",
            "intitules_rncps^7",
            "mots_clefs_specifiques^40",
            "domaine^3",
            "mots_clefs^3",
            "sous_domaine_onisep^1",
            "intitules_fap^1",
          ],
          type: "phrase_prefix",
          operator: "or",
        },
      },
    },
  };
};

const getDiplomasAndRomes = async (searchKeyword) => {
  try {
    let terms = [];

    searchKeyword.split(" ").forEach((term, idx) => {
      if (idx === 0 || term.length > 2) {
        terms.push(getMultiMatchTerm(term));
      }
    });

    const esClient = getDiplomesMetiersES();

    const response = await esClient.search({
      index: "diplomesmetiers",
      size: 5,
      _sourceIncludes: ["intitule_long", "codes_romes", "codes_rncps"],
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
        label: labelAndRome._source.intitule_long,
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

const updateDiplomesMetiersQuery = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let result = await updateDiplomesMetiers();
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

module.exports = {
  updateDiplomesMetiersQuery,
  getDiplomasAndRomesQuery,
};
