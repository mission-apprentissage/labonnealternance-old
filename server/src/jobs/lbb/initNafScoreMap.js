const path = require("path");
const logger = require("../../common/logger");
const fs = require("fs");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

let nafRomeHiringMap = {};

const filePath = path.join(__dirname, "./assets/contrats_30j.csv");

let count = 0;

const parseLine = async (line) => {
  const terms = line.split('"');

  if (count % 1000 === 0) {
    logMessage("info", ` -- update init rome naf hirings ${count}`);
  }
  count++;

  if (count > 1) {
    return {
      rome: terms[0].slice(0, -1),
      naf: terms[2].slice(1, -1),
      hirings: parseInt(terms[4].slice(1)),
    };
  }
};

const computeLine = async ({ rome, naf, hirings }) => {
  //console.log(rome, naf, hirings);

  let nafHirings = nafRomeHiringMap[naf];

  if (nafHirings) {
    nafHirings.hirings = nafHirings.hirings + hirings;
    nafHirings.romes.push(rome);
  } else {
    nafHirings = { hirings, romes: [rome] };
  }
  nafHirings[rome] = hirings;

  nafRomeHiringMap[naf] = nafHirings;
};

module.exports = async () => {
  try {
    try {
      await oleoduc(
        fs.createReadStream(filePath),
        readLineByLine(),
        transformData((line) => parseLine(line)),
        writeData(async (line) => computeLine(line))
      );
    } catch (err2) {
      console.log("stopped");
    }
    logMessage("info", `End init rome naf hirings`);
  } catch (err) {
    logMessage("error", err);
  }

  return nafRomeHiringMap;
};
