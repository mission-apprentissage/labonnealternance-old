const { logMessage } = require("../../common/utils/logMessage");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./assets/predictions.csv");
const config = require("config");

const seuilElimination = config.private.lbb.score50Level;

let predictionMap = {};
let count = 0;

const parseLine = (line) => {
  const terms = line.split(";");

  if (count % 50000 === 0) {
    logMessage("info", ` -- update init predictions ${count}`);
  }
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

const computeLine = async ({ siret, score }) => {
  //console.log(rome, naf, hirings);
  if (score >= seuilElimination) {
    predictionMap[siret] = score;
    //console.log("predictioMap : ",siret, score);
  }
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start init predictionMap -- ");
    logMessage("info", ` -- Seuil d'élimination : ${seuilElimination}`);

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line)),
      writeData(async (line) => computeLine(line))
    );

    logMessage("info", `End init predictionMap`);
  } catch (err) {
    console.log("error step ", step);
    logMessage("error", err);
  }

  return predictionMap;
};
