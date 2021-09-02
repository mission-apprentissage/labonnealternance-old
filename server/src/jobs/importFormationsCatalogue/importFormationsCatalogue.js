const _ = require("lodash");
const logger = require("../../common/logger");
const { ConvertedFormation_0, ConvertedFormation_1 } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const { getConvertedFormations, countFormations } = require("../../common/components/catalogue");
const {
  getCurrentFormationsSourceIndex,
  updateFormationsSourceIndex,
  updateFormationsIndexAlias,
} = require("../../common/components/indexSourceFormations");
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

const emptyMongo = async (model) => {
  logMessage("info", `Clearing formations db...`);
  await model.deleteMany({});
};

const clearIndex = async (index) => {
  try {
    let client = getElasticInstance();
    logMessage("info", `Removing formations index ${index} ...`);
    await client.indices.delete({ index });
  } catch (err) {
    logMessage("error", `Error emptying es index : ${err.message}`);
  }
};

const createIndex = async (workMongo) => {
  let requireAsciiFolding = true;
  logMessage("info", `Creating formations index ...`);
  await workMongo.createMapping(requireAsciiFolding);
};

const cleanIndexAndDb = async ({ workIndex, workMongo }) => {
  await emptyMongo(workMongo);
  await clearIndex(workIndex);
  await createIndex(workMongo);
};

const importFormations = async ({ workIndex, workMongo }) => {
  //TODO: faire un appel à countFormations

  logMessage("info", `Début import`);

  const stats = {
    total: 0,
    created: 0,
    failed: 0,
  };

  try {
    // TODO: ajouter filtre publié dans la query

    await getConvertedFormations({ limit: 100, query: { published: true } }, async (chunck) => {
      logger.info(`Inserting ${chunck.length} formations ...`);
      await oleoduc(
        Readable.from(chunck),
        writeData(
          async (e) => {
            stats.total++;
            try {
              await workMongo.create(e);
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
    return stats;
  } catch (e) {
    // stop here if not able to get etablissements (keep existing ones)
    logger.error("Error fetching formations from Catalogue", workIndex, e);
    throw new Error("Error fetching formations from Catalogue");
  }
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Import formations catalogue -- ");

    logMessage("info", `Début traitement`);

    // step 1 : compte formations distantes.

    const formationCount = await countFormations();

    console.log("décompte ? ", formationCount);

    // passer à la suite seulement si le count est > 0

    let stats = {
      total: 0,
      created: 0,
      failed: 0,
    };
    let workIndex = "convertedformation_0";

    if (formationCount > 0) {
      // si ok

      const currentIndex = await getCurrentFormationsSourceIndex();

      console.log("currentIndex : ", currentIndex);

      let workMongo = ConvertedFormation_0;

      if (currentIndex === "convertedformation_0") {
        workIndex = "convertedformation_1";
        workMongo = ConvertedFormation_1;
      }

      await cleanIndexAndDb({ workIndex, workMongo });

      stats = await importFormations({ workIndex, workMongo });

      await updateFormationsSourceIndex(workIndex);
      await updateFormationsIndexAlias({ masterIndex: workIndex, indexToUnAlias: currentIndex });

      console.log("updated at ", workIndex);
    }
    logMessage("info", `Fin traitement`);

    return {
      result: "Import formations catalogue terminé",
      index_maitre: workIndex,
      nb_formations: stats.created,
      erreurs: stats.failed,
    };
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
