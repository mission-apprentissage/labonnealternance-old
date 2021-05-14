const axios = require("axios");
const config = require("config");
const Sentry = require("@sentry/node");
const _ = require("lodash");

const urlCatalogueSearch = `${config.private.catalogueUrl}/api/v1/es/search/convertedformation/_search/`;

const getRomesFromCatalogue = async ({ cfd, siret }) => {
  try {
    let mustTerm = [];

    if (cfd) {
      mustTerm.push({
        match: {
          cfd,
        },
      });
    }

    if (siret) {
      mustTerm.push({
        match: {
          etablissement_formateur_siret: siret,
        },
      });
    }

    const esQueryIndexFragment = getFormationEsQueryIndexFragment();

    const body = {
      query: {
        bool: {
          must: mustTerm,
        },
      },
    };

    const responseFormations = await axios.post(urlCatalogueSearch, body, {
      params: esQueryIndexFragment,
    });

    //throw new Error("BOOM");
    let romes = [];

    responseFormations.data.hits.hits.forEach((formation) => {
      romes = romes.concat(formation._source.rome_codes);
    });

    let result = { romes: romes };

    if (!romes.length) {
      result.error = "No training found";
    }

    return result;
  } catch (err) {
    let error_msg = _.get(err, "meta.body", err.message);
    console.error("Error getting trainings from romes ", error_msg);
    if (_.get(err, "meta.meta.connection.status") === "dead") {
      console.error("Elastic search is down or unreachable");
    }
    Sentry.captureException(err);

    return { romes: [], error: error_msg, message: error_msg };
  }
};

const getRomesFromCfd = ({ cfd }) => {
  return getRomesFromCatalogue({ cfd });
};

const getRomesFromSiret = ({ siret }) => {
  return getRomesFromCatalogue({ siret });
};

const getFormationEsQueryIndexFragment = () => {
  return {
    index: "convertedformation",
    size: 1000,
    _sourceIncludes: ["rome_codes"],
  };
};

module.exports = {
  getRomesFromCfd,
  getRomesFromSiret,
};
