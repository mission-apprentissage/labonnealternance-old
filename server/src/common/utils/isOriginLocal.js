const localOrigin = [
  "https://labonnealternance-recette.apprentissage.beta.gouv.fr",
  "https://labonnealternance.apprentissage.beta.gouv.fr",
  "http://localhost:3003",
  "http://localhost:3000", //TODO: temporaire jusqu'à suppression de :3000
];

const isOriginLocal = (origin) => {
  return origin ? localOrigin.findIndex((element) => origin.includes(element)) >= 0 : false;
};

module.exports = { isOriginLocal };
