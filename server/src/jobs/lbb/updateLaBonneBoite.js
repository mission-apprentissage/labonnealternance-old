const path = require("path");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { GeoLocation, BonnesBoites } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const config = require("config");
const initNafScoreMap = require("./initNafScoreMap.js");
const initNafMap = require("./initNafMap.js");
const initPredictionMap = require("./initPredictionMap.js");
const { logMessage } = require("../../common/utils/logMessage");
const { mongooseInstance } = require("../../common/mongodb");

let nafScoreMap = {};
let predictionMap = {};
let nafMap = {};

const filePath = path.join(__dirname, "./assets/etablissements.csv");

let findRomesForNafCount = 0;
let findRomesForNafTime = 0;

let getScoreForCompanyCount = 0;
let getScoreForCompanyTime = 0;
let getGeoCount = 0;
let getGeoTime = 0;
let findBBCount = 0;
let findBBTime = 0;
let running = false;

const findRomesForNaf = async (bonneBoite) => {
  let sTime = new Date().getTime();
  let romes = await filterRomesFromNafHirings(bonneBoite);
  let eTime = new Date().getTime();

  findRomesForNafTime += eTime - sTime;
  findRomesForNafCount++;

  return romes;
};

const resetHashmaps = () => {
  nafScoreMap = {};
  predictionMap = {};
  nafMap = {};
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

const synchIndex = async () => {
  logMessage("info", `Reindexing bonnesboites ...`);
  await BonnesBoites.synchronize();
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
      // 0.2 arbitraire
      return (bonneBoite.score * nafRomeHirings[rome]) / nafRomeHirings.hirings > 0.2;
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
        await geoLocation.save();
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

let count = 0;

const parseLine = async (line) => {
  const terms = line.split(";");

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

module.exports = async () => {
  if (!running) {
    running = true;
    try {
      logMessage("info", " -- Start updating lbb db -- ");
      logMessage("info", `score 100 :  ${config.private.lbb.score100Level}`);
      logMessage("info", `score 080 :  ${config.private.lbb.score80Level}`);
      logMessage("info", `score 060 :  ${config.private.lbb.score60Level}`);
      logMessage("info", `score 050 :  ${config.private.lbb.score50Level}`);

      var exec = require("child_process").exec;

      exec(`wc -l ${filePath}`, function (error, results) {
        logMessage("info", results);
      });

      const db = mongooseInstance.connection;

      nafScoreMap = await initNafScoreMap();
      nafMap = await initNafMap();
      predictionMap = await initPredictionMap();

      // TODO: supprimer ce reset
      await emptyMongo();

      try {
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

      // clearing memory
      resetHashmaps();

      await clearIndex();
      await createIndex();
      await synchIndex();
      logMessage("info", `End updating lbb db`);

      running = false;

      return {
        result: "Table mise à jour",
      };
    } catch (err) {
      running = false;
      logMessage("error", err);
      let error_msg = _.get(err, "meta.body") ?? err.message;
      return { error: error_msg };
    }
  } else {
    return { error: "process_already_running" };
  }
};
