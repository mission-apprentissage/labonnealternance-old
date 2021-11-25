const path = require("path");
const logger = require("../../common/logger");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const filePath = path.join(__dirname, "./assets/etablissements.csv");

const parseLine = (line) => {
  /*const terms = line.split(",");

  let intitule_naf = terms[3];
  if (terms.length > 5) {
    // cas où l'intitulé contient des virgules
    for (let i = 4; i < terms.length - 1; ++i) {
      intitule_naf += "," + terms[i];
    }
    intitule_naf = intitule_naf.slice(1, -1);
  }

  return {
    code_rome: terms[0],
    intitule_rome: terms[1],
    code_naf: terms[2],
    intitule_naf,
    hirings: terms[terms.length - 1],
  };*/

  return line;
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating lbb db -- ");

    await oleoduc(
      fs.readAsStream(filePath),
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
