const logger = require("../logger");
const config = require("config");

const localOrigin = [
  "https://labonnealternance.beta.pole-emploi.fr",
  "https://labonnealternance.pole-emploi.fr",
  "http://localhost:3003",
  "http://localhost:3000", //TODO: temporaire jusqu'à suppression de :3000
];

const localOriginRegexp = /^https:\/\/labonnealternance(.*).apprentissage.beta.gouv.fr(.*)/i;
const recetteRegexp = /^https:\/\/labonnealternance-recette.apprentissage.beta.gouv.fr(.*)/i;
const prodRegexp = /^https:\/\/labonnealternance.apprentissage.beta.gouv.fr(.*)/i;

const isCrossEnvironmentRequest = (origin) => {
  if (
    (recetteRegexp.test(origin) && prodRegexp.test(config.publicUrl)) ||
    (prodRegexp.test(origin) && recetteRegexp.test(config.publicUrl))
  ) {
    logger.info("test isCrossEnvironmentRequest true : " + origin + " - " + config.publicUrl);
    return true;
  } else {
    logger.info("test isCrossEnvironmentRequest false : " + origin + " - " + config.publicUrl);
    return false;
  }
};

const isOriginLocal = (origin) => {
  logger.info("origin : " + origin);
  if (origin) {
    if (
      (localOriginRegexp.test(origin) ||
        localOrigin.findIndex((element) => origin.toLowerCase().includes(element)) >= 0) &&
      origin.indexOf("api-docs") < 0 &&
      !isCrossEnvironmentRequest(origin)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = { isOriginLocal };
