const localOrigin = [
  "https://labonnealternance-recette.apprentissage.beta.gouv.fr/",
  "https://labonnealternance.apprentissage.beta.gouv.fr/",
  "http://localhost:3003/",
];

const isOriginLocal = (origin) => {
  return localOrigin.indexOf(origin) >= 0;
};

module.exports = { isOriginLocal };
