const romeNafSchema = {
  code_rome: {
    type: String,
    default: null,
    description: "Le code rome",
  },
  intitule_rome: {
    type: String,
    default: null,
    description: "L'intitule rome",
  },
  code_naf: {
    type: String,
    default: null,
    description: "Le code naf",
  },
  intitule_naf: {
    type: String,
    default: null,
    description: "L'intitule naf",
  },
  hirings: {
    type: Number,
    default: 0,
    description: "Nombre d'embauches pour ce naf",
  },
};

module.exports = romeNafSchema;
