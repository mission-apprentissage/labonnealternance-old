const fs = require("fs");
const path = require("path");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const { Opco } = require("../../common/model");
const _ = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const opcoAktoSirenFilePath = path.join(__dirname, "./assets/20220301-Akto_SIREN.csv");

let i = 0;
let running = false;

const saveOpco = async (opcoData) => {
  let opco = new Opco(opcoData);

  try {
    await opco.save();
  } catch (err) {
    //do nothing
  }

  i++;
  if (i % 10000 === 0) {
    logMessage("info", `${i} sirens inserted`);
  }
};

const resetContext = () => {
  running = false;
  i = 0;
};

const parseOpco = (line) => {
  return {
    siren: line,
    opco: "akto",
  };
};

module.exports = async () => {
  if (!running) {
    running = true;
    try {
      logMessage("info", " -- Start inserting opco sirens -- ");

      await Opco.deleteMany({});

      // extraction depuis les établissements des adresses à géolocaliser
      await oleoduc(
        fs.createReadStream(opcoAktoSirenFilePath),
        readLineByLine(),
        transformData((line) => parseOpco(line)),
        writeData(async (opco) => {
          await saveOpco(opco);
        })
      );

      logMessage("info", `End inserting opco sirens (${i})`);

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
    logMessage("Opco job already running");
  }
};
