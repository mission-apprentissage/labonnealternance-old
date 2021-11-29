const path = require("path");
const logger = require("../../common/logger");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const geoData = require("../../common/utils/geoData");
const { RomeNaf, CompanyScore } = require("../../common/model");
const config = require("config");

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

const getScoreForCompany = async (siret) => {
  let company = await CompanyScore.findOne({ siret, active: true });

  if (company?.score) {
    if (company.score >= config.lbb.score100Level) {
      return 100;
    }

    if (company.score >= config.lbb.score80Level) {
      return 80;
    }

    if (company.score >= config.lbb.score60Level) {
      return 60;
    }

    return 50;
  } else {
    return null;
  }
};

const parseLine = async (line) => {
  const terms = line.split(";");

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

  let score = await getScoreForCompany(company.siret);

  if (!score) {
    return null;
  }

  let [geo, romes] = await Promise.all([geoData.getFirstMatchUpdates(company), findRomesForNaf(company.code_naf)]);

  // filtrage des éléments inexploitables
  if (romes.length === 0) {
    return null;
  }

  if (!geo) {
    return null;
  }

  company = { ...geo, romes, ...company };

  //console.log("cmp ",company);
  return company;
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating lbb db -- ");

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line), { parallel: 8 }),
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
