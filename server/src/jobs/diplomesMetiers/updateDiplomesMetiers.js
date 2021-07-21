const axios = require("axios");
const config = require("config");
const _ = require("lodash");
const Sentry = require("@sentry/node");
const logger = require("../../common/logger");
const { DiplomesMetiers } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");

const urlCatalogueSearch = `${config.private.catalogueUrl}/api/v1/es/search/convertedformation/_search/`;

const logMessage = (level, msg) => {
  // remplacer par les outils disponibles de manière générale

  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const motsIgnores = ["a", "au", "aux", "l", "le", "la", "les", "d", "de", "du", "des", "et", "en"];

const emptyMongo = async () => {
  logMessage("info", `Clearing diplomesmetiers db...`);
  await DiplomesMetiers.deleteMany({});
};

const clearIndex = async () => {
  try {
    let client = getElasticInstance();
    logMessage("info", `Removing diplomesmetiers index...`);
    await client.indices.delete({ index: "diplomesmetiers" });
  } catch (err) {
    logMessage("error", `Error emptying es index : ${err.message}`);
  }
};

const createIndex = async () => {
  let requireAsciiFolding = true;
  logMessage("info", `Creating diplomesmetiers index...`);
  await DiplomesMetiers.createMapping(requireAsciiFolding);
};

const buildAcronyms = (intitule) => {
  let acronymeLong = "";
  let acronymeCourt = "";

  let intitule_sans_parenthese = intitule;

  if (intitule.indexOf(" (") >= 0) {
    intitule_sans_parenthese = intitule.substring(0, intitule.indexOf(" ("));
  }

  const tokens = intitule_sans_parenthese.toLowerCase().split(/[\s-';:,)]+/);
  tokens.map((token) => {
    if (token) {
      acronymeLong += token[0];

      if (motsIgnores.indexOf(token) < 0) {
        acronymeCourt += token[0];
      }
    }
  });

  return acronymeCourt + " " + acronymeLong;
};

let diplomesMetiers = [];
let rank = 0;
let shouldStop = false;
const size = 1500;
let lastIdToSearchAfter = null;

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start of DiplomesMetiers initializer -- ");

    await emptyMongo();
    await clearIndex();

    await createIndex();

    let avertissements = [];

    logMessage("info", `Début traitement`);

    while (!shouldStop && rank < 30) {
      await getIntitulesFormations({ size });
      rank++;
    }

    //console.log("diplomesMetiers ", Object.keys(diplomesMetiers).length);

    step = 1;

    for (const k in diplomesMetiers) {
      diplomesMetiers[k].acronymes_intitule = buildAcronyms(diplomesMetiers[k].intitule_long);

      let diplomesMetier = new DiplomesMetiers(diplomesMetiers[k]);
      await diplomesMetier.save();

      //console.log("diplomeMetier saved : ", diplomesMetiers[k]);
    }

    logMessage("info", `Fin traitement`);

    return {
      result: "Table diplomesMetiers mise à jour",
      avertissements,
    };
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};

const getIntitulesFormations = async ({ size = 0 }) => {
  try {
    const body = {
      query: {
        bool: {
          must: {
            match_all: {},
          },
        },
      },
      sort: [{ _id: "asc" }],
    };

    //console.log("lastId : ", lastIdToSearchAfter);
    if (lastIdToSearchAfter) {
      body.search_after = [lastIdToSearchAfter];
    }

    const responseIntitulesFormations = await axios.post(urlCatalogueSearch, body, {
      params: getFormationCodesEsQueryIndexFragment({ size }),
    });

    let intitules = [];
    //console.log(responseIntitulesFormations.data.hits);

    responseIntitulesFormations.data.hits.hits.forEach((intitule) => {
      //console.log(intitule._source);

      if (!diplomesMetiers[intitule._source.intitule_long]) {
        //console.log("inited : ", intitule._source.intitule_long);
        diplomesMetiers[intitule._source.intitule_long] = {
          intitule_long: intitule._source.intitule_long,
          rome_codes: intitule._source.rome_codes,
          rncp_codes: [intitule._source.rncp_code],
        };
      } else {
        //console.log("updating : ", intitule._source.intitule_long);
        diplomesMetiers[intitule._source.intitule_long] = updateDiplomeMetier({
          initial: diplomesMetiers[intitule._source.intitule_long],
          toAdd: intitule._source,
        });
      }

      lastIdToSearchAfter = intitule._id;
    });

    if (responseIntitulesFormations.data.hits.hits.length < size) {
      shouldStop = true;
    }

    //console.log(responseIntitulesFormations.data.hits.hits.length);
    //console.log("et la l'int : ",intitules);

    return intitules;
  } catch (err) {
    Sentry.captureException(err);

    let error_msg = _.get(err, "meta.body") ? err.meta.body : err.message;
    console.log("Error getting diplomesMetiers", error_msg);
    console.log(err);
    if (_.get(err, "meta.meta.connection.status") === "dead") {
      console.log("Elastic search is down or unreachable");
    }
    return { error: error_msg };
  }
};

const updateDiplomeMetier = ({ initial, toAdd }) => {
  //console.log("updateDiplomeMetier : ",initial,toAdd);

  toAdd.rome_codes.forEach((rome_code) => {
    if (initial.rome_codes.indexOf(rome_code) < 0) {
      initial.rome_codes.push(rome_code);
      //console.log("added rome ", rome_code, " to ", initial.intitule_long);
    }
  });

  if (initial.rncp_codes.indexOf(toAdd.rncp_code) < 0) {
    initial.rncp_codes.push(toAdd.rncp_code);
    //console.log("added rncp ", toAdd.rncp_code, " to ", initial.intitule_long);
  }

  return initial;
};

const getFormationCodesEsQueryIndexFragment = ({ size = 10000 }) => {
  return {
    //index: "mnaformation",
    index: "convertedformation",
    size,
    _sourceIncludes: ["_id", "intitule_long", "rome_codes", "rncp_code"],
  };
};
