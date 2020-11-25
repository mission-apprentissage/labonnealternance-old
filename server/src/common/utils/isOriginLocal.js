const localOrigin = [
  "https://labonnealternance-recette.apprentissage.beta.gouv.fr",
  "https://labonnealternance.apprentissage.beta.gouv.fr",
  "http://localhost:3003",
];

const isOriginLocal = (origin) => {
  return origin ? localOrigin.findIndex((element) => origin.includes(element)) >= 0 : false;
};

module.exports = { isOriginLocal };
