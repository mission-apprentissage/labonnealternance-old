const localOrigin = [
  "https://labonnealternance-recette.beta.gouv.fr/",
  "https://labonnealternance.beta.gouv.fr/",
  "http://localhost:3003/",
];

const isOriginLocal = (origin) => {
  return localOrigin.indexOf(origin) >= 0;
};

module.exports = { isOriginLocal };
