const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const XLSX = require("xlsx");
const logger = require("../../common/logger");
const { DomainesMetiers } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const { getFileFromS3 } = require("../../common/utils/awsUtils");
const { oleoduc } = require("oleoduc");

const FILE_LOCAL_PATH = path.join(__dirname, "./assets/domainesMetiers_S3.xlsx");

const logMessage = (level, msg) => {
  console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

const emptyMongo = async () => {
  logMessage("info", `Clearing domainesmetiers db...`);
  await DomainesMetiers.deleteMany({});
};

const clearIndex = async () => {
  try {
    let client = getElasticInstance();
    logMessage("info", `Removing domainesmetiers index...`);
    await client.indices.delete({ index: "domainesmetiers" });
  } catch (err) {
    logMessage("error", `Error emptying es index : ${err.message}`);
  }
};

const createIndex = async () => {
  let requireAsciiFolding = true;
  logMessage("info", `Creating domainesmetiers index...`);
  await DomainesMetiers.createMapping(requireAsciiFolding);
};

const downloadAndSaveFile = (optionalFileName) => {
  logMessage(
    "info",
    `Downloading and save file ${optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx"} from S3 Bucket...`
  );
  return oleoduc(
    getFileFromS3(
      `mna-services/features/domainesMetiers/${optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx"}`
    ),
    fs.createWriteStream(FILE_LOCAL_PATH)
  );
};

const readXLSXFile = (filePath) => {
  const workbook = XLSX.readFile(filePath, { codepage: 65001 });
  return { sheet_name_list: workbook.SheetNames, workbook };
};

module.exports = async (optionalFileName) => {
  try {
    logMessage("info", " -- Start of DomainesMetiers initializer -- ");

    await downloadAndSaveFile(optionalFileName);

    await emptyMongo();
    await clearIndex();

    await createIndex();

    const workbookDomainesMetiers = readXLSXFile(FILE_LOCAL_PATH);

    let domaines, familles, codesROMEs, intitulesROMEs, codesRNCPs, intitulesRNCPs, couplesROMEsIntitules;

    const reset = () => {
      domaines = [];
      familles = [];
      codesROMEs = [];
      intitulesROMEs = [];
      codesRNCPs = [];
      intitulesRNCPs = [];
      couplesROMEsIntitules = [];
    };

    for (let i = 0; i < workbookDomainesMetiers.sheet_name_list.length; ++i) {
      logMessage("info", `Début traitement lettre : ${workbookDomainesMetiers.sheet_name_list[i]}`);

      let onglet = XLSX.utils.sheet_to_json(
        workbookDomainesMetiers.workbook.Sheets[workbookDomainesMetiers.sheet_name_list[i]]
      );

      reset();

      for (let j = 0; j < onglet.length; j++) {
        if (onglet[j].isSousDomaine) {
          // cas de la ligne sur laquelle se trouve le sous-domaine qui va marquer l'insertion d'une ligne dans la db

          let domainesMetier = new DomainesMetiers({
            domaine: onglet[j]["Domaine "], // haha, vous l'avez vu cet espace à la fin ? :)
            sous_domaine: onglet[j]["Sous domaine "], // et celui là ?
            mots_clefs: onglet[j]["mots clés"],
            domaines: domaines,
            familles: familles,
            codes_romes: codesROMEs,
            intitules_romes: intitulesROMEs,
            codes_rncps: codesRNCPs,
            intitules_rncps: intitulesRNCPs,
            couples_romes_metiers: couplesROMEsIntitules,
          });

          await domainesMetier.save();

          logMessage("info", `Added ${domainesMetier.sous_domaine} ${domainesMetier._id} to collection `);

          reset();
        } else {
          if (onglet[j].Domaine && domaines.indexOf(onglet[j].Domaine.trim()) < 0)
            domaines.push(onglet[j].Domaine.trim());
          if (onglet[j].Famille && familles.indexOf(onglet[j].Famille.trim()) < 0)
            familles.push(onglet[j].Famille.trim());

          //couplesROMEsIntitules
          if (
            (onglet[j]["Codes ROME"] &&
              onglet[j]["Intitulé code ROME"] &&
              codesROMEs.indexOf(onglet[j]["Codes ROME"].trim()) < 0) ||
            intitulesROMEs.indexOf(onglet[j]["Intitulé code ROME"].trim()) < 0
          ) {
            couplesROMEsIntitules.push({
              codeRome: onglet[j]["Codes ROME"].trim(),
              intitule: onglet[j]["Intitulé code ROME"].trim(),
            });
          }

          let currentROME = onglet[j]["Codes ROME"];
          if (currentROME && codesROMEs.indexOf(currentROME.trim()) < 0) {
            codesROMEs.push(currentROME.trim());
          }

          let currentIntituleROME = onglet[j]["Intitulé code ROME"];
          if (currentIntituleROME && intitulesROMEs.indexOf(currentIntituleROME.trim()) < 0) {
            intitulesROMEs.push(currentIntituleROME.trim());
          }

          let currentRNCP = onglet[j]["Code RNCP"];
          if (currentRNCP && codesRNCPs.indexOf(currentRNCP.trim()) < 0) {
            codesRNCPs.push(currentRNCP.trim());
          }

          let currentLibelleRNCP = onglet[j]["Libellé RNCP"];
          if (currentLibelleRNCP && intitulesRNCPs.indexOf(currentLibelleRNCP.trim()) < 0) {
            intitulesRNCPs.push(currentLibelleRNCP.trim());
          }
        }
      }
    }

    return {
      result: "Table mise à jour",
      fileName: optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx",
    };
  } catch (err) {
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg, fileName: optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx" };
  }
};
