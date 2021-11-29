const logger = require("../../common/logger");
const { CompanyScore } = require("../../common/model");
const fs = require("fs");
const path = require("path");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");

const filePath = path.join(__dirname, "./assets/predictions.csv");

const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const resetPredictionStatus = async () => {
  logMessage("info", `Reseting prediction status...`);
  await CompanyScore.updateMany({}, { active: false });
};

const parseLine = (line) => {
  const terms = line.split(";");

  return {
    siret: terms[0],
    score: terms[1],
    active: true,
  };
};

const updatePrediction = async (prediction) => {
  //console.log(line);

  try {
    if (prediction.score >= 1) {
      //console.log("GOOOD : ", prediction.score);

      let cScore = await CompanyScore.findOneAndUpdate({ siret: prediction.siret }, prediction, {
        new: true,
        upsert: true,
      });
      await cScore.save();
    } else {
      //console.log("predictionscore : ", prediction.score);
    }
  } catch (err) {
    console.log("error saving line : ", prediction, err.message);
  }
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating predictions -- ");

    await resetPredictionStatus();

    let count = 0;

    await oleoduc(
      fs.createReadStream(filePath),
      readLineByLine(),
      transformData((line) => parseLine(line), { parallel: 8 }),
      writeData(
        async (prediction) => {
          if (count % 1000 === 0) {
            logMessage("info", ` -- update ${count}`);
          }
          count++;

          await updatePrediction(prediction);
        },
        { parallel: 8 }
      )
    );

    logMessage("info", `End updating predictions`);

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
