const {
  validateRomes,
  validateRadius,
  validateLatitude,
  validateLongitude,
  validateDiploma,
  validateApiSources,
  validateInsee,
} = require("./queryValidators");

const jobsEtFormationsQueryValidator = (query) => {
  let error_messages = [];

  // contrôle des paramètres

  // codes ROME : romes
  validateRomes(query.romes, error_messages);

  // rayon de recherche : radius
  validateRadius(query.radius, error_messages);

  // coordonnées gps : latitude et longitude
  validateLatitude(query.latitude, error_messages);
  validateLongitude(query.longitude, error_messages);

  // diploma mal formée si présente
  validateDiploma(query.diploma, error_messages);

  // code INSEE : insee
  validateInsee(query.insee, error_messages);

  // source mal formée si présente
  validateApiSources(query.sources, error_messages, ["formations", "lbb", "lba", "offres"]);

  if (error_messages.length) return { error: "wrong_parameters", error_messages };

  return { result: "passed" };
};

module.exports = { jobsEtFormationsQueryValidator };
