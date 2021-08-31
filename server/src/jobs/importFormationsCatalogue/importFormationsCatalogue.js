const _ = require("lodash");
const logger = require("../../common/logger");
const { ConvertedFormation_0, ConvertedFormation_1 } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const { getConvertedFormations, countFormations } = require("../../common/components/catalogue");
const { getCurrentFormationsSource /*, updateFormationsSource*/ } = require("../../common/components/sourceFormations");
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
  await createIndex(workIndex);
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
    await getConvertedFormations({ limit: 10, query: {} }, async (chunck) => {
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
    console.log({ stats });
  } catch (e) {
    // stop here if not able to get etablissements (keep existing ones)
    logger.error("ConvertedFormation", workIndex, e);
    return;
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

    if (formationCount > 0) {
      // si ok

      const currentIndex = await getCurrentFormationsSource();

      console.log("currentIndex : ", currentIndex);

      let workIndex = "convertedformation_0";
      let workMongo = ConvertedFormation_0;

      if (currentIndex === "convertedformation_0") {
        workIndex = "convertedformation_1";
        workMongo = ConvertedFormation_1;
      }

      cleanIndexAndDb({ workIndex, workMongo });
      importFormations({ workIndex, workMongo });

      //await updateFormationsSource(currentIndex);

      /* 
      récupération dans base de la base de formations active = convertedformation_0 | convertedformation_1 .absolute

      --> currentIndex = sourceFormations.getCurrentFormationsSource

      currentIndex = ;



      lancement travail dans autre base 
      
      quand travail terminé 

      modification alias index principal

      enregistrement en base de la nouvelle base / index master

      --> sourceFormations.updateFormationsSource(currentIndex)

      POST _aliases
      {
        "actions": [
          {
            "add": {
              "index": mnaFormations_0,
              "alias": "convertedformations"
            }
          }
        ]
      }



    */

      /*
    await emptyMongo();
    await clearIndex();
    await createIndex();
      */

      //importFormations();
    }
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
