const path = require("path");
const fs = require("fs");
const axios = require("axios");
const XLSX = require("xlsx");
const logger = require("../../common/logger");

/**
 * Mode d'emploi :
 * dans une fenêtre de terminal, sous /server exécuter : clear & node -e 'require("./src/jobs/urlDediees/genererUrlDediees")'
 */

const FICHIER_SOURCE = path.join(__dirname, "./assets/Test_ARA_1.xlsx");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const resultFilePath = path.join(__dirname, "./assets/urlDediees.xlsx");

//https://labonnealternance.apprentissage.beta.gouv.fr/recherche-apprentissage?&caller=conseil%20pole%20emploi&romes=D1102&lon=2.347&lat=48.859&radius=30

const creationAdresseWidget = async ({ codePostal, romeProjet, rome1 }) => {
  const coords = await getCoordinatesForZipcode(codePostal);

  if (coords) {
    return `https://labonnealternance.pole-emploi.fr/recherche-apprentissage?caller=expeara&romes=${
      romeProjet || rome1
    }&lon=${coords.lon}&lat=${coords.lat}&radius=30&utm_source=pole-emploi&utm_medium=mail&utm_campaign=pe_ara`;
  }

  return "";
};

const coordsByZipcode = {};

const getCoordinatesForZipcode = async (zipcode) => {
  let coords = coordsByZipcode[zipcode];

  if (coords) {
    return coords;
  }

  const addressURL = `https://api-adresse.data.gouv.fr/search/?limit=1&q=${zipcode}&type=municipality`;

  const address = await axios.get(addressURL);

  if (address?.data?.features.length) {
    coords = {
      lon: address.data.features[0].geometry.coordinates[0],
      lat: address.data.features[0].geometry.coordinates[1],
    };

    coordsByZipcode[zipcode] = coords;
  }

  return coords;
};

const saveResultToFile = (rows) => {
  logMessage("info", " -- Enregistrement fichier résultat -- ");

  try {
    fs.unlinkSync(resultFilePath);
  } catch (err) {
    console.log("error removing file : ", err.message);
  }

  let wsResult = [["URL personnalisée", "ROME 1", "ROME PROJET", "CODE POSTAL", "IDE"]];

  rows.map((row) => {
    wsResult.push([row["URL personnalisée"], row["ROME 1"], row["ROME PROJET"], row["CODE POSTAL"], row["IDE"]]);
  });

  // Ecriture résultat
  let wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(wsResult), "url_dediees");

  XLSX.writeFile(wb, resultFilePath);
};

const readXLSXFile = (filePath) => {
  const workbook = XLSX.readFile(filePath, { codepage: 65001 });
  return { sheet_name_list: workbook.SheetNames, workbook };
};

const init = async () => {
  try {
    logMessage("info", " -- Début génération URL dédiées -- ");

    const workbookDomainesMetiers = readXLSXFile(FICHIER_SOURCE);

    logMessage("info", `Début traitement`);

    let onglet = XLSX.utils.sheet_to_json(workbookDomainesMetiers.workbook.Sheets["Feuil1"]);
    let rows = [];

    for (let i = 0; i < onglet.length; i++) {
      let row = onglet[i];

      row["URL personnalisée"] = await creationAdresseWidget({
        codePostal: row["CODE POSTAL"],
        romeProjet: row["ROME PROJET"],
        rome1: row["ROME 1"],
      });

      //console.log(row);
      rows.push(row);
    }

    saveResultToFile(rows);

    console.log("FINI");
  } catch (err) {
    console.log("ERREUR DE TRAITEMENT : ", err);
  }
};

init();
