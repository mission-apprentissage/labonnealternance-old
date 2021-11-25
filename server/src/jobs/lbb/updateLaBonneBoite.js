const path = require("path");
const logger = require("../../common/logger");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { RomeNaf } = require("../../common/model");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const filePath = path.join(__dirname, "./assets/etablissements.csv");

const findRomesForNaf = async (nafCode) => {
  const romes = await RomeNaf.find({ code_naf: nafCode }, { code_rome: 1 });
  return romes.map((rome) => rome.code_rome);
};

const parseLine = async (line) => {
  const terms = line.split(";");

  /*let intitule_naf = terms[3];
  if (terms.length > 5) {
    // cas où l'intitulé contient des virgules
    for (let i = 4; i < terms.length - 1; ++i) {
      intitule_naf += "," + terms[i];
    }
    intitule_naf = intitule_naf.slice(1, -1);
  }*/

  let company = {
    siret: terms[0],
    enseigne: terms[1],
    nom: terms[2],
    code_naf: terms[3],
    numero_voie: terms[4],
    nom_voie: terms[5],
    insee: terms[6],
    code_postal: terms[7],
  };

  company.romes = await findRomesForNaf(company.code_naf);

  let geo = await geoData.getFirstMatchUpdates(company);
  //console.log(a);

  company = { ...geo, ...company };

  return company;
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating lbb db -- ");

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line)),
      writeData(async (line) => {
        console.log(line);
      })
    );

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
