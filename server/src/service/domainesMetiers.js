const logger = require("../common/logger");
const { getDomainesMetiersES } = require("../common/esClient");
const _ = require("lodash");
const config = require("config");
const updateDomainesMetiers = require("../jobs/domainesMetiers/updateDomainesMetiers");
const getMissingRNCPsFromDomainesMetiers = require("../jobs/domainesMetiers/getMissingRNCPsFromDomainesMetiers");
const Sentry = require("@sentry/node");
const { getRomesFromCfd, getRomesFromSiret } = require("./romesFromCatalogue");

const getRomesAndLabelsFromTitleQuery = async (query) => {
  if (!query.title) return { error: "title_missing" };
  else {
    let [romesMetiers, romesDiplomes] = await Promise.all([
      getLabelsAndRomes(query.title),
      getLabelsAndRomesForDiplomas(query.title),
    ]);
    return { ...romesMetiers, ...romesDiplomes };
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

const getMultiMatchTermForDiploma = (term) => {
  return {
    bool: {
      must: {
        multi_match: {
          query: term,
          fields: ["intitule_long^1", "acronymes_intitule^2"],
          type: "phrase_prefix",
          operator: "or",
        },
      },
    },
  };
};

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
        type: "job",
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

const getLabelsAndRomesForDiplomas = async (searchKeyword) => {
  try {
    let terms = [];

    searchKeyword.split(" ").forEach((term, idx) => {
      if (idx === 0 || term.length > 2) {
        terms.push(getMultiMatchTermForDiploma(term));
      }
    });

    const esClient = getDomainesMetiersES();

    const response = await esClient.search({
      index: "diplomesmetiers",
      size: 20,
      _sourceIncludes: ["intitule_long", "codes_romes", "codes_rncps"],
      body: {
        query: {
          bool: {
            should: terms,
          },
        },
      },
    });

    let labelsAndRomesForDiplomas = [];

    response.body.hits.hits.forEach((labelAndRomeForDiploma) => {
      labelsAndRomesForDiplomas.push({
        label: labelAndRomeForDiploma._source.intitule_long,
        romes: labelAndRomeForDiploma._source.codes_romes,
        rncps: labelAndRomeForDiploma._source.codes_rncps,
        type: "diploma",
      });
    });

    //throw new Error("BOOOOOOOM");

    return { labelsAndRomesForDiplomas };
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

const updateRomesMetiersQuery = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let result = await updateDomainesMetiers(query.fileName);
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

const getMissingRNCPs = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let result = await getMissingRNCPsFromDomainesMetiers(query.fileName);
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

const getMetiersPourCfd = async ({ cfd }) => {
  let romeResponse = await getRomesFromCfd({ cfd });

  if (romeResponse.error) {
    romeResponse.metiers = [];
    return romeResponse;
  }

  const romes = [...new Set(romeResponse.romes)];

  let metiers = await getMetiersFromRomes(romes);

  return metiers;
};

const getMetiersPourEtablissement = async ({ siret }) => {
  let romeResponse = await getRomesFromSiret({ siret });

  if (romeResponse.error) {
    romeResponse.metiers = [];
    return romeResponse;
  }

  const romes = [...new Set(romeResponse.romes)];

  let metiers = await getMetiersFromRomes(romes);

  return metiers;
};

const getMetiersFromRomes = async (romes) => {
  /**
   * récupère dans la table custo tous les métiers qui correspondent au tableau de romes en paramètres
   */
  try {
    const esClient = getDomainesMetiersES();

    const response = await esClient.search({
      index: "domainesmetiers",
      size: 20,
      _sourceIncludes: ["sous_domaine"],
      body: {
        query: {
          match: {
            codes_romes: romes.join(","),
          },
        },
      },
    });

    let metiers = [];

    response.body.hits.hits.forEach((metier) => {
      metiers.push(metier._source.sous_domaine);
    });

    //throw new Error("BOOOOOOOM");

    return { metiers };
  } catch (err) {
    Sentry.captureException(err);
    let error_msg = _.get(err, "meta.body") ?? err.message;

    if (_.get(err, "meta.meta.connection.status") === "dead") {
      logger.error(`Elastic search is down or unreachable. error_message=${error_msg}`);
    } else {
      logger.error(`Error getting romes from keyword. error_message=${error_msg}`);
    }

    return { error: error_msg, metiers: [] };
  }
};

module.exports = {
  getRomesAndLabelsFromTitleQuery,
  updateRomesMetiersQuery,
  getMissingRNCPs,
  getMetiersPourCfd,
  getMetiersPourEtablissement,
};
