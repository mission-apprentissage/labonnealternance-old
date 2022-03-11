const fs = require("fs");
const path = require("path");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
//const { Opco } = require("../../common/model");
const _ = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const opcoAktoSirenFilePath = path.join(__dirname, "./assets/20220301-Akto_SIREN.csv");

let i = 0;

const saveOpco = async (opcoData) => {
  //let opco = new Opco(opcoData);
  //await opco.save();
  console.log("Opco : ", i++, opcoData);
};

const parseOpco = (line) => {
  return {
    siren: line,
    opco: "akto",
  };
};

module.exports = async () => {
  try {
    logMessage("info", " -- Start inserting opco sirens -- ");

    // extraction depuis les établissements des adresses à géolocaliser
    await oleoduc(
      fs.createReadStream(opcoAktoSirenFilePath),
      readLineByLine(),
      transformData((line) => parseOpco(line), { parallel: 8 }),
      writeData((opco) => {
        saveOpco(opco);
      })
    );

    logMessage("info", `End inserting opco sirens`);

    return {
      result: "Table mise à jour",
    };
  } catch (err) {
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
