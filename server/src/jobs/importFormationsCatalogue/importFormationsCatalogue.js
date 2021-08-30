const _ = require("lodash");
const logger = require("../../common/logger");
const { DomainesMetiers } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
//const { oleoduc } = require("oleoduc");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const emptyMongo = async () => {
  logMessage("info", `Clearing formations db...`);
  await DomainesMetiers.deleteMany({});
};

const clearIndex = async () => {
  try {
    let client = getElasticInstance();
    logMessage("info", `Removing formations index...`);
    await client.indices.delete({ index: "domainesmetiers" });
  } catch (err) {
    logMessage("error", `Error emptying es index : ${err.message}`);
  }
};

const createIndex = async () => {
  let requireAsciiFolding = true;
  logMessage("info", `Creating formations index...`);
  await DomainesMetiers.createMapping(requireAsciiFolding);
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Debut import formations catalogue -- ");

    await emptyMongo();
    await clearIndex();

    await createIndex();

    logMessage("info", `Début traitement`);

    //

    logMessage("info", `Fin traitement`);

    return {
      result: "Import formations catalogue terminé",
      //avertissements,
    };
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
