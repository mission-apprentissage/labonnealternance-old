const localOrigin = [
  "https://labonnealternance.beta.pole-emploi.fr",
  "https://labonnealternance.pole-emploi.fr",
  "http://localhost:3003",
  "http://localhost:3000", //TODO: temporaire jusqu'à suppression de :3000
];

const localOriginRegexp = /^https:\/\/labonnealternance(.*).apprentissage.beta.gouv.fr(.*)/i;

const isOriginLocal = (origin) => {
  if (origin) {
    if (
      (localOrigin.findIndex((element) => origin.toLowerCase().includes(element)) >= 0 ||
        localOriginRegexp.test(origin)) &&
      origin.indexOf("api-docs") < 0
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
