const _ = require("lodash");
const logger = require("../../common/logger");
const { DiplomesMetiers } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");

const logMessage = (level, msg) => {
  // remplacer par les outils disponibles de manière générale

  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

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

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start of DiplomesMetiers initializer -- ");

    await emptyMongo();
    await clearIndex();

    await createIndex();

    let avertissements = [];

    logMessage("info", `Début traitement`);

    /*
      Récupération aggregation intitule_long + intitule_courts

      parcourt de cette liste sur la recette catalogue

      construction d'un ou plusieurs acronymes

      pour chaque intitule_long récupération des romes et des rncps

      enregistrement d'une ligne dans la mongo + indexation
    */

    return {
      result: "Table domainesMetiers mise à jour",
      avertissements,
    };
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
