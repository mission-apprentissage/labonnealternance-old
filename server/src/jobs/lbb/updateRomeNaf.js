const logger = require("../../common/logger");
const { RomeNaf } = require("../../common/model");
const miniget = require("miniget");
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

const emptyMongo = async () => {
  logMessage("info", `Clearing romenaf db...`);
  await RomeNaf.deleteMany({});
};

const parseLine = (line) => {
  const terms = line.split(",");

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
  };
};

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start updating rome naf -- ");

    await emptyMongo();

    await oleoduc(
      miniget(
        "https://raw.githubusercontent.com/StartupsPoleEmploi/labonneboite/master/labonneboite/common/data/rome_naf_mapping.csv"
      ),
      readLineByLine(),
      transformData((line) => parseLine(line)),
      writeData(async (line) => {
        //console.log("line ", line);

        try {
          const romeNaf = new RomeNaf(line);
          await romeNaf.save();
        } catch (err) {
          console.log("error saving line : ", line, err.message);
        }
      })
    );

    logMessage("info", `End updating rome naf`);

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
