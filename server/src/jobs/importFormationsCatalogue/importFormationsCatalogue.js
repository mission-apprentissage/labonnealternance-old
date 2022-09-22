const _ = require("lodash");
const { ConvertedFormation_0, ConvertedFormation_1 } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const {
  //getConvertedFormations,
  fetchFormations,
  countFormations,
} = require("../../common/components/catalogue");
const { mongooseInstance } = require("../../common/mongodb");
const { rebuildIndex } = require("../../common/utils/esUtils");
const {
  getCurrentFormationsSourceIndex,
  updateFormationsSourceIndex,
  updateFormationsIndexAlias,
} = require("../../common/components/indexSourceFormations");
const { oleoduc, transformData, writeData } = require("oleoduc");
//const { Readable } = require("stream");
const logger = require("../../common/logger");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");

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

const importFormations = async ({ workIndex, workMongo, formationCount }) => {
  logMessage("info", `Début import`);

  const stats = {
    total: 0,
    created: 0,
    failed: 0,
  };

  try {
    const db = mongooseInstance.connection;

    await oleoduc(
      await fetchFormations({ formationCount }),
      transformData(async (formation) => {
        //console.log(formation.cle_ministere_educatif,count++);
        return formation;
      }),
      writeData(async (formation) => {
        stats.total++;
        //console.log("save : ",formation.cle_ministere_educatif,count);
        try {
          await db.collections[workIndex].save(formation);
          stats.created++;
        } catch (e) {
          stats.failed++;
          logger.error(e);
        }

        if (stats.total % 1000 === 0) {
          logMessage("info", `${stats.total} trainings processed`);
        }
      }),
      { parallel: 8 }
    );

    await rebuildIndex(workMongo);

    return stats;
  } catch (e) {
    // stop here if not able to get trainings (keep existing ones)
    logger.error(`Error fetching formations from Catalogue ${workIndex}`, e);
    throw new Error("Error fetching formations from Catalogue");
  }
};

/*const importFormationsOldStyle = async ({ workIndex, workMongo }) => {
  logMessage("info", `Début import`);

  const stats = {
    total: 0,
    created: 0,
    failed: 0,
  };

  try {
    const db = mongooseInstance.connection;

    await getConvertedFormations({ limit: 1000 }, async (chunck) => {
      logger.info(`Inserting ${chunck.length} formations ...`);

      await oleoduc(
        Readable.from(chunck),
        writeData(
          async (e) => {
            stats.total++;
            try {
              //await workMongo.create(e);
              //console.log("e : ",e);

              await db.collections[workIndex].save(e);
              stats.created++;
            } catch (e) {
              stats.failed++;
              logger.error(e);
            }
          },
          { parallel: 8 }
        )
      );
    });

    await rebuildIndex(workMongo);

    return stats;
  } catch (e) {
    // stop here if not able to get trainings (keep existing ones)
    logger.error(`Error fetching formations from Catalogue ${workIndex}`, e);
    throw new Error("Error fetching formations from Catalogue");
  }
};
*/
let running = false;

module.exports = async (onlyChangeMasterIndex = false) => {
  if (!running) {
    running = true;

    try {
      logMessage("info", " -- Import formations catalogue -- ");

      const formationCount = await countFormations();

      logMessage("info", `${formationCount} à importer`);

      let stats = {
        total: 0,
        created: 0,
        failed: 0,
      };
      let workIndex = "convertedformation_0";

      if (formationCount > 0) {
        const currentIndex = await getCurrentFormationsSourceIndex();

        logMessage("info", `Index courant : ${currentIndex}`);

        let workMongo = ConvertedFormation_0;

        if (currentIndex === "convertedformation_0") {
          workIndex = "convertedformation_1";
          workMongo = ConvertedFormation_1;
        }

        logMessage("info", `Début process sur : ${workIndex}`);

        if (!onlyChangeMasterIndex) {
          await cleanIndexAndDb({ workIndex, workMongo });

          stats = await importFormations({ workIndex, workMongo, formationCount });
        } else {
          logMessage("info", `Permutation d'index seule`);
        }

        const savedSource = await updateFormationsSourceIndex(workIndex);

        logMessage("info", "Source mise à jour en base ", savedSource.currentIndex);

        const savedIndexAliasResult = await updateFormationsIndexAlias({
          masterIndex: workIndex,
          indexToUnAlias: currentIndex,
        });

        if (savedIndexAliasResult === "ok") {
          logMessage("info", "Alias mis à jour dans l'ES ", workIndex);
        } else {
          logMessage("error", "Alias pas mis à jour dans l'ES ", workIndex);
        }
      }
      logMessage("info", `Fin traitement`);

      running = false;

      notifyToSlack(
        `Import formations catalogue terminé sur ${workIndex}. ${stats.created} OK. ${stats.failed} erreur(s)`
      );

      return {
        result: "Import formations catalogue terminé",
        index_maitre: workIndex,
        nb_formations: stats.created,
        erreurs: stats.failed,
      };
    } catch (err) {
      logMessage("error", err);
      let error_msg = _.get(err, "meta.body") ?? err.message;
      running = false;
      notifyToSlack(`ECHEC Import formations catalogue. ${error_msg}`);
      return { error: error_msg };
    }
  } else {
    logMessage("info", "Import formations catalogue already running");
  }
};
