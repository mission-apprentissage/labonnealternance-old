const _ = require("lodash");
const logger = require("../../common/logger");
const { ConvertedFormation } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const { oleoduc, writeData } = require("oleoduc");
const { Readable } = require("stream");

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
  await ConvertedFormation.deleteMany({});
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
  await ConvertedFormation.createMapping(requireAsciiFolding);
};

const importFormations = async (catalogue) => {
  logMessage("info", `Début import`);

  const stats = {
    total: 0,
    created: 0,
    failed: 0,
  };

  try {
    await catalogue.getConvertedFormations({ limit: 1000, query: {} }, async (chunck) => {
      logger.info(`Inserting ${chunck.length} formations ...`);
      await oleoduc(
        Readable.from(chunck),
        writeData(
          async (e) => {
            stats.total++;
            try {
              await ConvertedFormation.create(e);
              stats.created++;
            } catch (e) {
              stats.failed++;
              logger.error(e);
            }
          },
          { parallel: 5 }
        )
      );
    });
    console.log({ stats });
  } catch (e) {
    // stop here if not able to get etablissements (keep existing ones)
    logger.error("ConvertedFormation", e);
    return;
  }
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
    importFormations();

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
