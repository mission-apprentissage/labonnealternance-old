const localOrigin = [
  "https://labonnealternance-recette.apprentissage.beta.gouv.fr",
  "https://labonnealternance.apprentissage.beta.gouv.fr",
  "http://localhost:3003",
];

const isOriginLocal = (origin) => {
  return localOrigin.findIndex((element) => origin.includes(element)) >= 0;
};

module.exports = { isOriginLocal };
