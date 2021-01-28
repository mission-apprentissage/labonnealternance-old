const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const logger = require("../../common/logger");
const { DomainesMetiers } = require("../../common/model");
const { getElasticInstance } = require("../../common/esClient");
const { getFileFromS3 } = require("../../common/utils/awsUtils");

const FILE_LOCAL_PATH = path.join(__dirname, "./assets/domainesMetiers_S3.xlsx");

const emptyMongo = async () => {
  console.log(`Clearing domainesmetiers db...`);
  await DomainesMetiers.deleteMany({});
};

const clearIndex = async () => {
  try {
    let client = getElasticInstance();
    console.log(`Removing domainesmetiers index...`);
    await client.indices.delete({ index: "domainesmetiers" });
  } catch (err) {
    console.log(`Error emptying es index : ${err.message}`);
  }
};

const createIndex = async () => {
  let requireAsciiFolding = true;
  console.log(`Creating domainesmetiers index...`);
  await DomainesMetiers.createMapping(requireAsciiFolding);
};

const downloadAndSaveFile = () => {
  console.log(`Downloading and save file from S3 Bucket...`);

  return new Promise((r) => {
    getFileFromS3("mna-services/features/domainesMetiers/currentDomainesMetiers.xlsx")
      .pipe(fs.createWriteStream(FILE_LOCAL_PATH))
      .on("close", () => {
        r();
      });
  });
};

const readXLSXFile = (filePath) => {
  const workbook = XLSX.readFile(filePath, { codepage: 65001 });
  return { sheet_name_list: workbook.SheetNames, workbook };
};

module.exports = async () => {
  try {
    console.log(" -- Start of DomainesMetiers initializer -- ");

    await emptyMongo();
    await clearIndex();
    await createIndex();

    await downloadAndSaveFile();

    const workbookDomainesMetiers = readXLSXFile(FILE_LOCAL_PATH);

    let domaines, familles, codesROMEs, intitulesROMEs, couplesROMEsIntitules;

    const reset = () => {
      domaines = [];
      familles = [];
      codesROMEs = [];
      intitulesROMEs = [];
      couplesROMEsIntitules = [];
    };

    for (let i = 0; i < workbookDomainesMetiers.sheet_name_list.length; ++i) {
      console.log(`Début traitement lettre : ${workbookDomainesMetiers.sheet_name_list[i]}`);

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
            couples_romes_metiers: couplesROMEsIntitules,
          });

          await domainesMetier.save();

          console.log(`Added ${domainesMetier.sous_domaine} ${domainesMetier._id} to collection `);

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

          if (onglet[j]["Codes ROME"] && codesROMEs.indexOf(onglet[j]["Codes ROME"].trim()) < 0)
            codesROMEs.push(onglet[j]["Codes ROME"].trim());
          if (onglet[j]["Intitulé code ROME"] && intitulesROMEs.indexOf(onglet[j]["Intitulé code ROME"].trim()) < 0)
            intitulesROMEs.push(onglet[j]["Intitulé code ROME"].trim());
        }
      }
    }
  } catch (err) {
    logger.error(err);
  }
};
