const { logMessage } = require("../../common/utils/logMessage");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const fs = require("fs");
const path = require("path");

//const updateFilePath = path.join(__dirname, "./assets/lba_save_etablissements_admin_update.csv");
const removeFilePath = path.join(__dirname, "./assets/lba_save_etablissements_admin_remove.csv");
const addFilePath = path.join(__dirname, "./assets/lba_save_etablissements_admin_add.csv");

let removeMap = {};
//let updateMap = {};
let addMap = {};

let removeCount = 0;
let addCount = 0;
//let updateCount = 0;

/*
const parseUpdateLine = (line) => {
  const terms = line.split(";");

  count++;

  if (count > 1) {
    return {
      siret: terms[0].padStart(14, "0"),
      score: terms[1],
    };
  } else {
    return null;
  }
};
*/
const parseRemoveLine = (line) => {
  const terms = line.split("\t");
  removeCount++;

  if (removeCount > 1) {
    return {
      siret: terms[1].replace(/"/g, ""),
    };
  } else {
    return null;
  }
};
const parseAddLine = (line) => {
  const terms = line.split("\t");

  addCount++;

  /*
    siret	raisonsociale	enseigne	codenaf	numerorue	libellerue	codecommune	codepostal	email	tel	website	flag_alternance	flag_junior	flag_senior	flag_handicap	departement	trancheeffectif	score	coordinates_x	coordinates_y	id	date_created	date_updated	created_by_id	updated_by_id	email_alternance	score_alternance	social_network	phone_alternance	website_alternance	contact_mode	flag_poe_afpr	flag_pmsmp
    41766958700038	CENTRE INTERNATIONAL DE RESSOURCES ET D INNOVATION POUR LE DÉVELOPPEMENT DURABLE		9499Z	60	rue des acieries	42218	42000	contact@ciridd.org	477922340	https://www.ciridd.org/	0	0	0	0	42	0	0	4.4	45.4333	1	2018-03-15 14:57:25		25662			0					0	0
    */

  if (addCount > 1) {
    let lbbScore = terms[17].replace(/"/g, "");
    let lbaScore = terms[26].replace(/"/g, "");
    let score = lbaScore !== "0" ? lbaScore : lbbScore;

    let company = {
      siret: terms[0].replace(/"/g, "").padStart(14, "0"),
      raisonsociale: terms[1],
      enseigne: terms[2],
      code_naf: terms[3].replace(/"/g, ""),
      numero_rue: terms[4].replace(/"/g, ""),
      libelle_rue: terms[5],
      code_commune: terms[6].replace(/"/g, ""),
      code_postal: terms[7].replace(/"/g, ""),
      email: terms[8],
      telephone: terms[9].replace(/"/g, ""),
      website: terms[10],
      tranche_effectif: terms[16].replace(/"/g, ""),
      type: lbaScore !== "0" ? "lba" : "lbb",
      score,
    };

    /*
  romes -> récupérer via naf
  intitule_naf -> récupére via map correspondante
  ville -> recup via map
  geo_coordonnees -> recup via map
      */

    return company;
  } else {
    return null;
  }
};

const computeLine = async ({ saveMap, etablissement }) => {
  saveMap[etablissement.siret] = etablissement;
};

const initSAVERemoveMap = async () => {
  try {
    logMessage("info", " -- Start init SAVE Remove map -- ");

    await oleoduc(
      fs.createReadStream(removeFilePath),
      readLineByLine(),
      transformData((line) => parseRemoveLine(line)),
      writeData(async (etablissement) => computeLine({ saveMap: removeMap, etablissement }))
    );

    logMessage("info", `End init SAVE Remove map (${removeCount} companies)`);
  } catch (err) {
    logMessage("error", err);
  }

  removeCount = 0;

  return removeMap;
};

const initSAVEAddMap = async () => {
  try {
    logMessage("info", " -- Start init SAVE Add map -- ");

    await oleoduc(
      fs.createReadStream(addFilePath),
      readLineByLine(),
      transformData((line) => parseAddLine(line)),
      writeData(async (etablissement) => computeLine({ saveMap: addMap, etablissement }))
    );

    //console.log(" addMap : ", addMap);

    logMessage("info", `End init SAVE Add map (${addCount} companies)`);
  } catch (err) {
    logMessage("error", err);
  }

  addCount = 0;

  return addMap;
};

module.exports = {
  initSAVERemoveMap,
  initSAVEAddMap,
  /*initSAVEUpdateMap,*/
};
