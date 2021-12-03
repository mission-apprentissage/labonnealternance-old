const path = require("path");
const logger = require("../../common/logger");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { /*RomeNaf, CompanyScore,*/ BonnesBoites } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const config = require("config");
const initNafScoreMap = require("./initNafScoreMap.js");
const initNafMap = require("./initNafMap.js");
const initPredictionMap = require("./initPredictionMap.js");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

let nafScoreMap = {};
let predictionMap = {};
let nafMap = {};

const filePath = path.join(__dirname, "./assets/etablissements.csv");

let findRomesForNafCount = 0;
let findRomesForNafTime = 0;
/*let filterRomesFromNafHiringsCount = 0;
let filterRomesFromNafHiringsTime = 0;*/
let getScoreForCompanyCount = 0;
let getScoreForCompanyTime = 0;
let getGeoCount = 0;
let getGeoTime = 0;
let findBBCount = 0;
let findBBTime = 0;

const findRomesForNaf = async (bonneBoite) => {
  let sTime = new Date().getTime();
  /*let dbRomes = await RomeNaf.find({ code_naf: bonneBoite.code_naf }, { code_rome: 1 });

  let romes = dbRomes.map((rome) => rome.code_rome);*/

  let romes = filterRomesFromNafHirings(bonneBoite /*, romes*/);
  let eTime = new Date().getTime();

  findRomesForNafTime += eTime - sTime;
  findRomesForNafCount++;

  return romes;
};

const emptyMongo = async () => {
  logMessage("info", `Clearing bonnesboites db...`);
  await BonnesBoites.deleteMany({});
};

const clearIndex = async () => {
  try {
    let client = getElasticInstance();
    logMessage("info", `Removing bonnesboites index...`);
    await client.indices.delete({ index: "bonnesboites" });
  } catch (err) {
    logMessage("error", `Error emptying es index : ${err.message}`);
  }
};

const createIndex = async () => {
  let requireAsciiFolding = true;
  logMessage("info", `Creating bonnesboites index...`);
  await BonnesBoites.createMapping(requireAsciiFolding);
};

const getScoreForCompany = async (siret) => {
  let sTime = new Date().getTime();
  //let companyScore = await CompanyScore.findOne({ siret, active: true });

  let companyScore = predictionMap[siret];

  let eTime = new Date().getTime();

  getScoreForCompanyCount++;
  getScoreForCompanyTime += eTime - sTime;

  return companyScore;

  /*
  if (companyScore?.score) {
    return companyScore.score;
    if (company.score >= config.private.lbb.score100Level) {
      return 100;
    }

    if (company.score >= config.private.lbb.score80Level) {
      return 80;
    }

    if (company.score >= config.private.lbb.score60Level) {
      return 60;
    }

    return 50;
  } else {
    return null;
  }*/
};

const filterRomesFromNafHirings = (bonneBoite /*, romes*/) => {
  //let sTime = new Date().getTime();
  const nafRomeHirings = nafScoreMap[bonneBoite.code_naf];

  let filteredRomes = [];
  if (nafRomeHirings) {
    filteredRomes = nafRomeHirings.romes.filter((rome) => {
      /*console.log(
      rome,
      bonneBoite.enseigne,
      (bonneBoite.score * nafRomeHirings[rome]) / nafRomeHirings.hirings,
      nafRomeHirings[rome],
      nafRomeHirings[rome] / nafRomeHirings.hirings
    );*/

      // 0.2 arbitraire
      return (bonneBoite.score * nafRomeHirings[rome]) / nafRomeHirings.hirings > 0.2;
    });
  }

  //let eTime = new Date().getTime();

  //filterRomesFromNafHiringsCount++;
  //filterRomesFromNafHiringsTime += eTime - sTime;

  //console.log(romes, filteredRomes, bonneBoite.score, bonneBoite.code_naf, nafRomeHirings.hirings);

  return filteredRomes;
};

const getGeoLocationForCompany = async (bonneBoite) => {
  if (!bonneBoite.geo_coordonnees) {
    let sTime = new Date().getTime();
    let result = await geoData.getFirstMatchUpdates(bonneBoite);
    let eTime = new Date().getTime();
    getGeoCount++;
    getGeoTime += eTime - sTime;

    return result;
  } else return null;
};

let count = 0;

const parseLine = async (line) => {
  const terms = line.split(";");

  if (count % 1000 === 0) {
    logMessage(
      "info",
      ` -- update ${count} - findRomesForNaf : ${findRomesForNafCount} avg ${
        findRomesForNafTime / findRomesForNafCount
      }ms -- getScoreForCompanyTime ${getScoreForCompanyCount} avg ${
        getScoreForCompanyTime / getScoreForCompanyCount
      }ms -- getGeoCount ${getGeoCount} avg ${getGeoTime / getGeoCount}ms -- findBBCount ${findBBCount} avg ${
        findBBTime / findBBCount
      }ms `
    );
  }
  count++;

  let company = {
    siret: terms[0],
    enseigne: terms[1],
    nom: terms[2],
    code_naf: terms[3],
    numero_rue: terms[4],
    libelle_rue: terms[5],
    code_commune: terms[6],
    code_postal: terms[7],
  };

  let score = await getScoreForCompany(company.siret);

  if (!score) {
    //TODO: checker si réhaussage artificiel vie support PE
    //console.log("pas de score");
    return null;
  }

  let sTime = new Date().getTime();
  let bonneBoite = await BonnesBoites.findOne({ siret: company.siret });
  let eTime = new Date().getTime();
  findBBCount++;
  findBBTime += eTime - sTime;

  if (!bonneBoite) {
    //console.log("bonne boite existe pas ", company.siret);
    company.intitule_naf = nafMap[company.code_naf];
    bonneBoite = new BonnesBoites(company);
  } else {
    console.log("bonne boîte existe déjà : ", bonneBoite);
  }

  bonneBoite.score = score;

  // TODO checker si suppression via support PE

  let [geo, romes] = await Promise.all([getGeoLocationForCompany(bonneBoite), findRomesForNaf(bonneBoite)]);

  // filtrage des éléments inexploitables
  if (romes.length === 0) {
    //console.log("pas de romes");
    return null;
  } else {
    bonneBoite.romes = romes;
  }

  if (!bonneBoite.geo_coordonnees) {
    if (!geo) {
      console.log("pas de geoloc");
      return null;
    } else {
      bonneBoite.ville = geo.ville;
      bonneBoite.geo_coordonnees = geo.geo_coordonnees;
    }
  }

  //console.log("cmp ",company);
  return bonneBoite;
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating lbb db -- ");
    logMessage("info", `score 100 :  ${config.private.lbb.score100Level}`);
    logMessage("info", `score 080 :  ${config.private.lbb.score80Level}`);
    logMessage("info", `score 060 :  ${config.private.lbb.score60Level}`);
    logMessage("info", `score 050 :  ${config.private.lbb.score50Level}`);
    //console.log("ENNNNNVVVV ",process.env);

    nafScoreMap = await initNafScoreMap();
    nafMap = await initNafMap();
    predictionMap = await initPredictionMap();

    // voir comment supprimer tout ça
    await emptyMongo();
    await clearIndex();
    await createIndex();

    //console.log("nafScoreMap : ", nafScoreMap);

    //let i = 0;
    try {
      await oleoduc(
        fs.createReadStream(filePath),
        readLineByLine(),
        transformData((line) => parseLine(line), { parallel: 8 }),
        writeData(async (bonneBoite) => {
          /*++i;
          if (i > 2) {
            throw new Error("STOOOOPPPPPP");
          }*/
          //console.log(bonneBoite.enseigne,bonneBoite.romes);
          bonneBoite.save();
        })
      );
    } catch (err2) {
      console.log("stopped ", err2);
    }
    logMessage("info", `End updating lbb db`);

    return {
      result: "Table mise à jour",
    };
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
