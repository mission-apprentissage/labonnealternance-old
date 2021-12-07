const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const path = require("path");
const { oleoduc, readLineByLine, transformData, writeData } = require("oleoduc");
const initPredictionMap = require("./initPredictionMap.js");
const { GeoLocation } = require("../../common/model");
const _ = require("lodash");
const fsExtra = require("fs-extra");
const { logMessage } = require("../../common/utils/logMessage");
const tempDir = "./assets/geoLocations/";
const etablissementFilePath = path.join(__dirname, "./assets/etablissements.csv");

let predictionMap = {};

const parseAdressesEtablissements = (line) => {
  const terms = line.split(";");

  if (terms[4] !== "numerorue") {
    return {
      siret: terms[0],
      numerorue: terms[4].toUpperCase(),
      libellerue: terms[5].toUpperCase(),
      citycode: terms[6],
    };
  } else {
    return null;
  }
};

/*const emptyMongo = async () => {
  logMessage("info", `Clearing geolocations db...`);
  await GeoLocation.deleteMany({});
};*/

// traite un fichier de retour geoloc de la ban
const parseGeoLoc = (line) => {
  //rue;postcode;latitude;longitude;result_label;result_score;result_type;result_id;result_housenumber;result_name;result_street;result_postcode;result_city;result_context;result_citycode;result_oldcitycode;result_oldcity;result_district
  const terms = line.split(";");

  const result = {
    address: `${terms[0].trim()} ${terms[1]}`.toUpperCase(),
    city: terms[12],
    postcode: terms[11],
    geoLocation: `${terms[2]},${terms[3]}`,
  };

  return result;
};

// enregistre un fichier d'adresses à géolocaliser
const createToGeolocateFile = (addressesToGeolocate, sourceFileCount) => {
  fs.writeFileSync(path.join(__dirname, `${tempDir}geolocatesource-${sourceFileCount}.csv`), addressesToGeolocate);
};

const saveGeoData = async (geoData) => {
  let geoLocation = new GeoLocation(geoData);
  if ((await GeoLocation.countDocuments({ address: geoLocation.address })) === 0) {
    await geoLocation.save();
  }
};

const geolocateCsvHeader = "rue;citycode";

module.exports = async () => {
  let step = 0;

  try {
    logMessage("info", " -- Start bulk geolocations -- ");

    predictionMap = await initPredictionMap();

    fsExtra.emptyDirSync(path.join(__dirname, tempDir));

    let sourceFileCount = 0;

    logMessage("info", `Construction fichiers d'adresses à géolocaliser`);

    let adressesToGeolocate = `${geolocateCsvHeader}\r\n`;
    let adressesToGeolocateCount = 0;

    const saveSourceGeolocateFile = () => {
      createToGeolocateFile(adressesToGeolocate, sourceFileCount);
      sourceFileCount++;
      adressesToGeolocate = `${geolocateCsvHeader}\r\n`;
    };

    // extraction depuis les établissements des adresses à géolocaliser
    await oleoduc(
      fs.createReadStream(etablissementFilePath),
      readLineByLine(),
      transformData((line) => parseAdressesEtablissements(line), { parallel: 10 }),
      writeData((line) => {
        if (predictionMap[line.siret]) {
          adressesToGeolocate += `${line.numerorue} ${line.libellerue};${line.citycode}\r\n`;
          adressesToGeolocateCount++;

          if (adressesToGeolocateCount % 1000 === 0) {
            // création de fichier d'adresses qui doivent être géolocalisées
            saveSourceGeolocateFile();
          }

          if (adressesToGeolocateCount % 50000 === 0) {
            logMessage("info", `${adressesToGeolocateCount} adresses à géolocaliser`);
          }
        }
      })
    );

    if (adressesToGeolocateCount % 1000 > 0) {
      // création de fichier avec reliquat des adresses qui doivent être géolocalisées
      saveSourceGeolocateFile();
      logMessage("info", `${adressesToGeolocateCount} adresses à géolocaliser`);
    }

    //await emptyMongo();

    logMessage("info", `Traitement géolocalisation`);
    for (let i = 0; i < sourceFileCount; ++i) {
      logMessage("info", `Géolocalisation fichier d'adressses (${i + 1}/${sourceFileCount})`);

      const sourceFilePath = path.join(__dirname, `${tempDir}geolocatesource-${i}.csv`);
      const form = new FormData();
      const stream = fs.createReadStream(sourceFilePath);
      form.append("data", stream, `geolocatesource-${i}.csv`);

      const res = await axios.post("https://api-adresse.data.gouv.fr/search/csv/", form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      const destFilePath = path.join(__dirname, `${tempDir}geolocated-${i}.csv`);
      fs.writeFileSync(destFilePath, res.data);

      await oleoduc(
        fs.createReadStream(destFilePath),
        readLineByLine(),
        transformData((line) => parseGeoLoc(line), { parallel: 10 }),
        writeData(
          (geoData) => {
            saveGeoData(geoData);
          },
          { parallel: 10 }
        )
      );
    }

    logMessage("info", `End bulk geolocation`);

    return {
      result: "Table mise à jour",
    };
  } catch (err) {
    console.log("error step ", step, err);
    logMessage("error", err);
    let error_msg = _.get(err, "meta.body") ?? err.message;
    return { error: error_msg };
  }
};
