const geoLocationSchema = {
  address: {
    type: String,
    default: null,
    description: "L'adresse d'un établissement",
    index: true,
  },
  geoLocation: {
    type: String,
    default: null,
    description: "Les coordonnées latitude et longitude",
  },
};

module.exports = geoLocationSchema;
