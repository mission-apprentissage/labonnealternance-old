const { logMessage } = require("../../common/utils/logMessage");
const { CompanyScore } = require("../../common/model");
const fs = require("fs");
const path = require("path");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const _ = require("lodash");
const config = require("config");

const filePath = path.join(__dirname, "./assets/predictions.csv");

const seuilElimination = config.private.lbb.score50Level;

const resetPredictionStatus = async () => {
  logMessage("info", `Reseting prediction status...`);
  await CompanyScore.updateMany({}, { active: false });
};

const parseLine = (line) => {
  const terms = line.split(";");

  return {
    siret: terms[0].padStart(14, "0"),
    score: terms[1],
    active: true,
  };
};

//let scoreHash = {};

const updatePrediction = async (prediction) => {
  try {
    if (prediction.score >= seuilElimination) {
      let cScore = await CompanyScore.findOneAndUpdate({ siret: prediction.siret }, prediction, {
        new: true,
        upsert: true,
      });
      await cScore.save();
    }
  } catch (err) {
    console.log("error saving line : ", prediction, err.message);
  }
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating predictions -- ");
    logMessage("info", ` -- Seuil d'élimination : ${seuilElimination}`);
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
