const path = require("path");
const axios = require("axios");
const config = require("config");
const fs = require("fs");
const _ = require("lodash");
const XLSX = require("xlsx");
const logger = require("../../common/logger");
const { DomainesMetiers } = require("../../common/model");
const urlCatalogueSearch = `${config.private.catalogueUrl}/api/v1/es/search/convertedformation/_search/`;
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

const getFormationEsQueryIndexFragment = (limit) => {
  return {
    //index: "mnaformation",
    index: "convertedformation",
    size: limit,
    _sourceIncludes: ["rncp_code", "rncp_intitule"],
  };
};

const getMissingRNCPsOfDomain = async (domain) => {
  try {
    const response = await axios.post(
      urlCatalogueSearch,
      {
        query: {
          bool: {
            must: {
              match: {
                rome_codes: domain.codes_romes.join(" "),
              },
            },
          },
        },
      },
      { params: getFormationEsQueryIndexFragment(10000) }
    );

    let missingRNCPs = [];
    let missingRNCPsWithLabel = [];
    let missingTrainingCount = 0;

    response.data.hits.hits.forEach((training) => {
      if (domain.codes_rncps.indexOf(training._source.rncp_code) < 0) {
        missingTrainingCount++;
        if (missingRNCPs.indexOf(training._source.rncp_code) < 0) {
          missingRNCPs.push(training._source.rncp_code);
          missingRNCPsWithLabel.push(`${training._source.rncp_code} : ${training._source.rncp_intitule}`);
        }
      }
    });
    //console.log("total ", response.data.hits.hits.length, " miss : ", missingRNCPs.length,[...new Set(missingRNCPs)].length);

    return {
      totalFormations: response.data.hits.hits.length,
      totalFormationsPerdues: missingTrainingCount,
      RNCPsManquants: missingRNCPsWithLabel,
    };
  } catch (err) {
    let error_msg = _.get(err, "meta.body") ?? err.message;

    if (_.get(err, "meta.meta.connection.status") === "dead") {
      logger.error(`Elastic search is down or unreachable. error_message=${error_msg}`);
    } else {
      logger.error(`Error analyzing rncps. error_message=${error_msg}`);
    }

    return { error: error_msg };
  }
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
    logMessage("info", " -- Start of DomainesMetiers analyzer -- ");

    await downloadAndSaveFile(optionalFileName);

    const workbookDomainesMetiers = readXLSXFile(FILE_LOCAL_PATH);

    let domaines, familles, codesROMEs, intitulesROMEs, codesRNCPs, intitulesRNCPs, couplesROMEsIntitules;

    let missingRNCPs = [];

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

          //console.log("ICIII : ", getMissingRNCPsOfDomain);

          let missingRNCPsOfDomain = await getMissingRNCPsOfDomain(domainesMetier);

          missingRNCPs.push({
            metier: domainesMetier.sous_domaine,
            /*codesROMEs,
            codesRNCPs,*/
            missingRNCPs: missingRNCPsOfDomain ? missingRNCPsOfDomain : "aucun RNCP manquant",
          });

          logMessage("info", `Analyzed ${domainesMetier.sous_domaine}`);

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
      result: "Fichier analysé",
      fileName: optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx",
      missingRNCPs,
    };
  } catch (err) {
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg, fileName: optionalFileName ? optionalFileName : "currentDomainesMetiers.xlsx" };
  }
};
