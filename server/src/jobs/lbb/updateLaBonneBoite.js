const path = require("path");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { GeoLocation, BonnesBoites } = require("../../common/model");
const { rebuildIndex } = require("../../common/utils/esUtils");
const config = require("config");
const initNafScoreMap = require("./initNafScoreMap.js");
const initNafMap = require("./initNafMap.js");
const initPredictionMap = require("./initPredictionMap.js");
const { logMessage } = require("../../common/utils/logMessage");
const { mongooseInstance } = require("../../common/mongodb");
const { initSAVERemoveMap, initSAVEUpdateMap, initSAVEAddMap } = require("./initSAVEMaps");

let nafScoreMap = {};
let predictionMap = {};
let nafMap = {};

let removeMap = {};
let updateMap = {};
let addMap = {};

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
    type: "lbb",
  };

  if (isCompanyRemoved(company.siret)) {
    BonnesBoites.delete({ siret: company.siret });
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

const updateSAVECompanies = async () => {
  logMessage("info", "Starting updateSAVECompanies");
  for (const key in updateMap) {
    let company = updateMap[key];

    let bonneBoite = await BonnesBoites.findOne({ siret: company.siret });

    if (bonneBoite) {
      // remplacement pour une bonneBoite trouvée par les données modifiées dans la table update SAVE
      if (company.raisonsociale) {
        bonneBoite.raisonsociale = company.raisonsociale;
        bonneBoite.enseigne = company.enseigne;
      }

      if (company?.email === "remove") {
        bonneBoite.email = "";
      } else if (company.email) {
        bonneBoite.email = company.email;
      }

      if (company?.telephone === "remove") {
        bonneBoite.telephone = "";
      } else if (company.telephone) {
        bonneBoite.telephone = company.telephone;
      }

      if (company?.website === "remove") {
        bonneBoite.website = "";
      } else if (company.website) {
        bonneBoite.website = company.website;
      }

      bonneBoite.type = company.type;

      if (company.romes) {
        bonneBoite.romes = [...new Set(company.romes.concat(bonneBoite.romes))];
      }

      await bonneBoite.save();
    }
  }
  logMessage("info", "Ended updateSAVECompanies");
};

/*
  Initialize bonneBoite from data, add missing data from maps, 
*/
const buildAndFilterBonneBoiteFromData = async (company) => {
  let score = company.score || (await getScoreForCompany(company.siret));

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

module.exports = async ({ shouldClearMongo, shouldBuildIndex, shouldParseFiles, shouldInitSAVEMaps }) => {
  if (!running) {
    running = true;
    try {
      logMessage("info", " -- Start updating lbb db -- ");
      logMessage("info", `score 100 :  ${config.private.lbb.score100Level}`);
      logMessage("info", `score 080 :  ${config.private.lbb.score80Level}`);
      logMessage("info", `score 060 :  ${config.private.lbb.score60Level}`);
      logMessage("info", `score 050 :  ${config.private.lbb.score50Level}`);

      if (shouldInitSAVEMaps) {
        removeMap = await initSAVERemoveMap();
        addMap = await initSAVEAddMap();
        updateMap = await initSAVEUpdateMap();
      }

      nafScoreMap = await initNafScoreMap();
      nafMap = await initNafMap();

      if (shouldParseFiles) {
        var exec = require("child_process").exec;

        exec(`wc -l ${filePath}`, function (error, results) {
          logMessage("info", results);
        });

        const db = mongooseInstance.connection;

        predictionMap = await initPredictionMap();

        // TODO: supprimer ce reset
        if (shouldClearMongo) {
          await emptyMongo();
        }

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
      }

      await insertSAVECompanies();
      await updateSAVECompanies();

      // clearing memory
      resetHashmaps();

      if (shouldBuildIndex) {
        await rebuildIndex(BonnesBoites);
      }

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
