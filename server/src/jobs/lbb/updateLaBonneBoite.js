const path = require("path");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { GeoLocation, BonnesBoites, Opco } = require("../../common/model");
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
const removeQuotes = require("./removeQuotes");

const defaultPredictionByROMEThreshold = 0.2; // 0.2 arbitraire
const CBSPredictionByROMEThreshold = 3.84; // 3.84 arbitraire
let predictionByROMEThreshold = defaultPredictionByROMEThreshold;

let nafScoreMap = {};
let predictionMap = {};
let nafMap = {};

let removeMap = {};
let updateMap = {};
let addMap = {};

let count = 0;
let romePredictionFilteredCount = 0;
let predictionOkCount = 0;

let findRomesForNafCount = 0;
let findRomesForNafTime = 0;

let getScoreForCompanyCount = 0;
let getScoreForCompanyTime = 0;
let getGeoCount = 0;
let getGeoTime = 0;
let findBBCount = 0;
let findBBTime = 0;
let running = false;

const filePath = path.join(__dirname, "./assets/etablissements/etablissements.csv");

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
  romePredictionFilteredCount = 0;
  predictionOkCount = 0;
  predictionByROMEThreshold = defaultPredictionByROMEThreshold;
};

const emptyMongo = async () => {
  logMessage("info", `Clearing bonnesboites db...`);
  await BonnesBoites.deleteMany({});
};

const getScoreAndTypeForCompany = (siret) => {
  let sTime = new Date().getTime();
  let companyScoreAndType = predictionMap[siret];

  //console.log(companyScore, siret);

  let eTime = new Date().getTime();

  getScoreForCompanyCount++;
  getScoreForCompanyTime += eTime - sTime;

  return companyScoreAndType;
};

const filterRomesFromNafHirings = (bonneBoite) => {
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

const getOpcoForCompany = async (bonneBoite) => {
  if (!bonneBoite.opco) {
    const siren = bonneBoite.siret.substring(0, 9);

    const result = await Opco.findOne({ siren });

    if (result) {
      return result.opco.toLowerCase();
    } else {
      return null;
    }
  }
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
      }ms filtered ${romePredictionFilteredCount} / ${predictionOkCount} / ${getScoreForCompanyCount}`
    );
  }
};

const initCompanyFromLine = (line) => {
  const terms = line.split(";");
  return {
    siret: removeQuotes(terms[0]).padStart(14, "0"),
    enseigne: removeQuotes(terms[1]),
    nom: removeQuotes(terms[2]),
    code_naf: removeQuotes(terms[3]),
    numero_rue: removeQuotes(terms[4]),
    libelle_rue: removeQuotes(terms[5]),
    code_commune: removeQuotes(terms[6]),
    code_postal: removeQuotes(terms[7]),
    email: terms[8].toUpperCase() !== '"NULL"' ? removeQuotes(terms[8]) : "",
    telephone: terms[9] !== '"NULL"' ? removeQuotes(terms[9]) : "",
    tranche_effectif: terms[10] !== '"NULL"' ? removeQuotes(terms[10]) : "",
    website: terms[11] !== '"NULL"' ? removeQuotes(terms[11]) : "",
    type: "",
  };
};

const parseLine = async (line) => {
  count++;

  printProgress();

  let company = initCompanyFromLine(line);

  if (!company.enseigne) {
    logMessage("error", `Error processing company. Company ${company.siret} has no name`);
    return null;
  }

  if (isCompanyRemoved(company.siret)) {
    await BonnesBoites.remove({ siret: company.siret });
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

const removeSAVECompanies = async () => {
  logMessage("info", "Starting removeSAVECompanies");
  for (const key in removeMap) {
    await BonnesBoites.remove({ siret: key });
  }
  logMessage("info", "Ended removeSAVECompanies");
};

/*
  Initialize bonneBoite from data, add missing data from maps, 
*/
const buildAndFilterBonneBoiteFromData = async (company) => {
  //console.log(company.score);
  let type;
  let score;

  if (company.type) {
    score = company.score;
    type = company.type;
  } else {
    const scoreAndTypeForCompany = getScoreAndTypeForCompany(company.siret);
    if (scoreAndTypeForCompany) {
      score = scoreAndTypeForCompany.score;
      type = scoreAndTypeForCompany.type;
    }
  }

  if (!score) {
    return null;
  }

  predictionOkCount++;

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
  bonneBoite.type = type;

  // TODO checker si suppression via support PE

  let romes = await findRomesForNaf(bonneBoite);

  // filtrage des éléments inexploitables
  if (romes.length === 0) {
    romePredictionFilteredCount++;
    return null;
  } else {
    bonneBoite.romes = romes;
  }

  let geo = await getGeoLocationForCompany(bonneBoite);

  if (!bonneBoite.geo_coordonnees) {
    if (!geo || geo.geoLocation === ",") {
      return null;
    } else {
      bonneBoite.ville = geo.city;
      bonneBoite.code_postal = geo.postcode;
      bonneBoite.geo_coordonnees = geo.geoLocation;
    }
  }

  bonneBoite.opco = await getOpcoForCompany(bonneBoite);

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
        try {
          await db.collections["bonnesboites"].save(bonneBoite);
        } catch (err) {
          logMessage("error", err);
        }
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
      } else if (shouldInitSAVEMaps) {
        await removeSAVECompanies();
      }

      await insertSAVECompanies();
      await updateSAVECompanies({ updateMap });

      if (shouldBuildIndex) {
        await rebuildIndex(BonnesBoites, { skipNotFound: true });
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
