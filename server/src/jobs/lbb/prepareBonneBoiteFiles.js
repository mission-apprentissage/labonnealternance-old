//const fs = require("fs");
//const fetch = require("node-fetch");
//const path = require("path");
//const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
//const _ = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");

/*
const opcoSirenFile = path.join(__dirname, "./assets/opco_sirens.csv");

const fetchOpcoFile = async () => {
  const token = await getAADToken();

  const headers = { Authorization: `Bearer ${token}` };

  await fetch(opcoDumpUrl, { headers }).then(
    (res) =>
      new Promise((resolve, reject) => {
        logMessage("info", " Receiving SIREN file ");
        const dest = fs.createWriteStream(opcoSirenFile);
        res.body.pipe(dest);
        dest.on("close", () => resolve());
        dest.on("error", reject);
      })
  );
};

const removeOpcoFile = async () => {
  logMessage("info", " Removing SIREN file ");
  try {
    await fs.unlinkSync(opcoSirenFile);
  } catch (err) {
    console.log(err);
  }
};
*/
const lookForUpdatedFiles = async () => {};

const moveFilesIntoJobAssets = async () => {};

module.exports = async () => {
  try {
    logMessage("info", " -- Start preparing Bonnes Boîtes files -- ");

    const newFiles = await lookForUpdatedFiles(); // regarder s'il y a des fichiers plus récents sur /mnt

    if (newFiles) {
      await await moveFilesIntoJobAssets(); // move depuis l'archive du fichier etablissements.csv vers /etablissements . idem avec les prédiction lba et lbb
    } else {
      logMessage("info", " -- no new files");
      notifyToSlack("pas de nouveaux fichiers");
    }

    return newFiles;
  } catch (err) {
    logMessage("error", err);
    return false;
  }
};
