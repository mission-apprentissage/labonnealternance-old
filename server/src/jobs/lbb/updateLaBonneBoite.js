const path = require("path");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { GeoLocation, BonnesBoites } = require("../../common/model");
const { rebuildIndex } = require("../../common/utils/esUtils");
//const config = require("config");
const initNafScoreMap = require("./initNafScoreMap.js");
const initNafMap = require("./initNafMap.js");
const initPredictionMap = require("./initPredictionMap.js");
const initCBSPredictionMap = require("./initCBSPredictionMap.js");
const { logMessage } = require("../../common/utils/logMessage");
const { mongooseInstance } = require("../../common/mongodb");
const { initSAVERemoveMap, initSAVEUpdateMap, initSAVEAddMap } = require("./initSAVEMaps");
const { updateSAVECompanies } = require("./updateSAVECompanies");

const defaultPredictionByROMEThreshold = 0.2; // 0.2 arbitraire
const CBSPredictionByROMEThreshold = 4; // 4 arbitraire
let predictionByROMEThreshold = defaultPredictionByROMEThreshold;

let nafScoreMap = {};
let predictionMap = {};
let nafMap = {};

let removeMap = {};
let updateMap = {};
let addMap = {};

let count = 0;

let findRomesForNafCount = 0;
let findRomesForNafTime = 0;

let getScoreForCompanyCount = 0;
let getScoreForCompanyTime = 0;
let getGeoCount = 0;
let getGeoTime = 0;
let findBBCount = 0;
let findBBTime = 0;
let running = false;

const filePath = path.join(__dirname, "./assets/etablissements.csv");

/*
path point de montage
const testFilePath = path.join(__dirname, "./datalakepe/extractmailing_lba_CCI.bz2");
let stats = fs.statSync(testFilePath);
var fileSizeInBytes = stats.size;
logMessage("info test montage", fileSizeInBytes);*/

const findRomesForNaf = async (bonneBoite) => {
  let sTime = new Date().getTime();
  let romes = await filterRomesFromNafHirings(bonneBoite);
  let eTime = new Date().getTime();

  findRomesForNafTime += eTime - sTime;
  findRomesForNafCount++;

  return romes;
};

const isCompanyRemoved = (siret) => {
  return removeMap[siret];
};

const resetHashmaps = () => {
  nafScoreMap = {};
  predictionMap = {};
  nafMap = {};

  removeMap = {};
  updateMap = {};
  addMap = {};
};

const resetContext = () => {
  running = false;
  // clearing memory and reseting params
  resetHashmaps();
  count = 0;
  predictionByROMEThreshold = defaultPredictionByROMEThreshold;
};

const emptyMongo = async () => {
  logMessage("info", `Clearing bonnesboites db...`);
  await BonnesBoites.deleteMany({});
};

const getScoreForCompany = async (siret) => {
  let sTime = new Date().getTime();
  let companyScore = predictionMap[siret];

  let eTime = new Date().getTime();

  getScoreForCompanyCount++;
  getScoreForCompanyTime += eTime - sTime;

  return companyScore;
};

const filterRomesFromNafHirings = (bonneBoite /*, romes*/) => {
  const nafRomeHirings = nafScoreMap[bonneBoite.code_naf];

  let filteredRomes = [];
  if (nafRomeHirings) {
    filteredRomes = nafRomeHirings.romes.filter((rome) => {
      return (bonneBoite.score * nafRomeHirings[rome]) / nafRomeHirings.hirings >= predictionByROMEThreshold;
    });
  }

  return filteredRomes;
};

const getGeoLocationForCompany = async (bonneBoite) => {
  if (!bonneBoite.geo_coordonnees) {
    let sTime = new Date().getTime();

    let geoKey = `${bonneBoite.numero_rue} ${bonneBoite.libelle_rue} ${bonneBoite.code_commune}`.trim().toUpperCase();

    let result = await GeoLocation.findOne({ address: geoKey });

    if (!result) {
      result = await geoData.getFirstMatchUpdates(bonneBoite);

      if (result) {
        let geoLocation = new GeoLocation({
          address: geoKey,
          ...result,
        });
        try {
          await geoLocation.save();
        } catch (err) {
          //ignore duplicate error
        }
      } else {
        return null;
      }
    }

    let eTime = new Date().getTime();
    getGeoCount++;
    getGeoTime += eTime - sTime;

    return result;
  } else return null;
};

const printProgress = () => {
  if (count % 50000 === 0) {
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
};

const initCompanyFromLine = (line) => {
  const terms = line.split(";");
  return {
    siret: terms[0].padStart(14, "0"),
    enseigne: terms[1],
    nom: terms[2],
    code_naf: terms[3],
    numero_rue: terms[4],
    libelle_rue: terms[5],
    code_commune: terms[6],
    code_postal: terms[7],
    email: terms[8] !== "NULL" ? terms[8] : "",
    telephone: terms[9] !== "NULL" ? terms[9] : "",
    tranche_effectif: terms[10] !== "NULL" ? terms[10] : "",
    website: terms[11] !== "NULL" ? terms[11] : "",
    type: "lbb",
  };
};

const parseLine = async (line) => {
  count++;

  printProgress();

  let company = initCompanyFromLine(line);

  if (isCompanyRemoved(company.siret)) {
    BonnesBoites.remove({ siret: company.siret });
    return null;
  }

  let bonneBoite = await buildAndFilterBonneBoiteFromData(company);

  return bonneBoite;
};

const insertSAVECompanies = async () => {
  logMessage("info", "Starting insertSAVECompanies");
  for (const key in addMap) {
    let company = addMap[key];

    let bonneBoite = await buildAndFilterBonneBoiteFromData(company);

    if (bonneBoite) {
      await bonneBoite.save();
    }
  }
  logMessage("info", "Ended insertSAVECompanies");
};

/*
  Initialize bonneBoite from data, add missing data from maps, 
*/
const buildAndFilterBonneBoiteFromData = async (company) => {
  let score = company.score || (await getScoreForCompany(company.siret));

  if (!score) {
    return null;
  }

  let sTime = new Date().getTime();
  let bonneBoite = await BonnesBoites.findOne({ siret: company.siret });
  let eTime = new Date().getTime();
  findBBCount++;
  findBBTime += eTime - sTime;

  if (!bonneBoite) {
    company.intitule_naf = nafMap[company.code_naf];
    bonneBoite = new BonnesBoites(company);
  }

  bonneBoite.score = score;

  // TODO checker si suppression via support PE

  let romes = await findRomesForNaf(bonneBoite);

  // filtrage des éléments inexploitables
  if (romes.length === 0) {
    return null;
  } else {
    bonneBoite.romes = romes;
  }

  let geo = await getGeoLocationForCompany(bonneBoite);

  if (!bonneBoite.geo_coordonnees) {
    if (!geo) {
      return null;
    } else {
      bonneBoite.ville = geo.city;
      bonneBoite.code_postal = geo.postcode;
      bonneBoite.geo_coordonnees = geo.geoLocation;
    }
  }

  return bonneBoite;
};

const processBonnesBoitesFile = async () => {
  try {
    const db = mongooseInstance.connection;

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line), { parallel: 8 }),
      writeData(async (bonneBoite) => {
        db.collections["bonnesboites"].save(bonneBoite);
      })
    );
  } catch (err2) {
    logMessage("error", err2);
    throw new Error("Error while parsing establishment file");
  }
};

const initPredictions = async ({ useCBSPrediction }) => {
  if (useCBSPrediction) {
    predictionByROMEThreshold = CBSPredictionByROMEThreshold;
    predictionMap = await initCBSPredictionMap();
  } else {
    predictionMap = await initPredictionMap();
  }
};

const initMaps = async ({ shouldInitSAVEMaps }) => {
  if (shouldInitSAVEMaps) {
    removeMap = await initSAVERemoveMap();
    addMap = await initSAVEAddMap();
    updateMap = await initSAVEUpdateMap();
  }

  nafScoreMap = await initNafScoreMap();
  nafMap = await initNafMap();
};

module.exports = async ({
  shouldClearMongo,
  shouldBuildIndex,
  shouldParseFiles,
  shouldInitSAVEMaps,
  useCBSPrediction,
}) => {
  if (!running) {
    running = true;
    try {
      logMessage("info", " -- Start updating lbb db -- ");

      await initMaps({ shouldInitSAVEMaps });

      if (shouldParseFiles) {
        await initPredictions({ useCBSPrediction });

        // TODO: supprimer ce reset
        if (shouldClearMongo) {
          await emptyMongo();
        }

        await processBonnesBoitesFile();
      }

      await insertSAVECompanies();
      await updateSAVECompanies({ updateMap });

      if (shouldBuildIndex) {
        await rebuildIndex(BonnesBoites);
      }

      logMessage("info", `End updating lbb db`);

      resetContext();

      return {
        result: "Table mise à jour",
      };
    } catch (err) {
      logMessage("error", err);
      let error_msg = _.get(err, "meta.body") ?? err.message;

      resetContext();

      return { error: error_msg };
    }
  } else {
    return { error: "process_already_running" };
  }
};
