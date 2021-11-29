const companyScoreSchema = {
  siret: {
    type: String,
    default: null,
    description: "Le Siret de la société",
    index: true,
  },
  score: {
    type: Number,
    default: 0,
    description: "Le score de recrutement de la société",
  },
  active: {
    type: Boolean,
    default: true,
    description: "indique si la prédiction est active pour l'établissement",
  },
};

module.exports = companyScoreSchema;
