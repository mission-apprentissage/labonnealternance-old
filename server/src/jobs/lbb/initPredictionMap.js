const { logMessage } = require("../../common/utils/logMessage");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const fs = require("fs");
const path = require("path");
const lbaFilePath = path.join(__dirname, "./assets/lba/predictions.csv");
const lbbFilePath = path.join(__dirname, "./assets/lbb/predictions.csv");
//const config = require("config");

const lbaEliminationThreshold = 2; //config.private.lbb.score50Level;
const lbbEliminationThreshold = 2; //config.private.lbb.score50Level;

let predictionMap = {};
let count = 0;
let bestOddLbbCount = 0;
let bestOddLbaCount = 0;

const parseLine = (line) => {
  const terms = line.split(";");

  if (count % 50000 === 0) {
    logMessage("info", ` -- update init predictions ${count}`);
  }
  count++;

  if (count > 1) {
    return {
      siret: terms[0].padStart(14, "0"),
      score: terms[terms.length == 2 ? 1 : 22],
    };
  } else {
    return null;
  }
};

const computeLine = async ({ siret, score }, type) => {
  if (score >= type === "lba" ? lbaEliminationThreshold : lbbEliminationThreshold) {
    if (type === "lba") {
      predictionMap[siret] = { score, type };
    } else {
      let prediction = predictionMap[siret];
      if (prediction) {
        if (prediction.score > score) {
          bestOddLbaCount++;
        } else {
          bestOddLbbCount++;
          prediction.score = score;
        }
      } else {
        prediction = { score, type };
      }
      predictionMap[siret] = prediction;
    }
  }
};

module.exports = async () => {
  try {
    logMessage("info", " -- Start init predictionMap -- ");
    logMessage(
      "info",
      ` -- Elimination thresholds : LBA ${lbaEliminationThreshold} --- LBB ${lbbEliminationThreshold}`
    );
    logMessage("info", " -- Processing LBA file");
    await oleoduc(
      fs.createReadStream(lbaFilePath),
      readLineByLine(),
      transformData((line) => parseLine(line, "lba")),
      writeData(async (line) => computeLine(line, "lba"))
    );

    logMessage("info", " -- Processing LBB file");
    await oleoduc(
      fs.createReadStream(lbbFilePath),
      readLineByLine(),
      transformData((line) => parseLine(line, "lbb")),
      writeData(async (line) => computeLine(line, "lbb"))
    );

    logMessage(
      "info",
      `End init predictionMap : ${
        Object.keys(predictionMap).length
      } companies kept over ${count} total predictions. both types : ${
        bestOddLbaCount + bestOddLbbCount
      }. Best odds : LBA ${bestOddLbaCount} LBB ${bestOddLbbCount}`
    );
  } catch (err) {
    logMessage("error", err);
  }

  count = 0;
  bestOddLbaCount = 0;
  bestOddLbbCount = 0;

  return predictionMap;
};
