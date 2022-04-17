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

const fetchOpcoFile = async () => {
  // suppression fichier temporaire
  /*
    Le fichier est disponible via notre API référentiel.

    Le swagger : https://api.akto.fr/referentiel/swagger/index.html
    Le endpoint pour récupérer le csv : /dump/adherents
    

    L’accès est sécurisé via une authentification AAD :

    Client Id : c6a6b396-82b9-4ab1-acc0-21b1c0ad8ae3
    Secret Id :
    Tenant Id : 0285c9cb-dd17-4c1e-9621-c83e9204ad68
    Scope : api://ef286853-e767-4dd1-8de3-67116195eaad/.default
  */
  // récupération autorisation d'accès
  // fetch du fichier https://api.akto.fr/referentiel/api/v1/Dump/Adherents
  // enregistrement du fichier
};

module.exports = async () => {
  if (!running) {
    running = true;
    try {
      logMessage("info", " -- Start inserting opco sirens -- ");

      await fetchOpcoFile();

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
