const companyScoreSchema = {
  siret: {
    type: String,
    default: null,
    description: "Le Siret de la société",
  },
  score: {
    type: Number,
    default: 0,
    description: "Le score de recrutement de la société",
  },
};

module.exports = companyScoreSchema;
