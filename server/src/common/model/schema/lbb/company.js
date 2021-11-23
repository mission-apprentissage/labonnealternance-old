const companySchema = {
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

  raisonsociale: {
    type: String,
    default: null,
    description: "Raison sociale de l'entreprise",
  },
  enseigne: {
    type: String,
    default: null,
    description: "Enseigne de l'entreprise",
  },
  code_naf: {
    type: String,
    default: null,
    description: "Code NAF de l'entreprise",
  },
  intitule_naf: {
    type: String,
    default: null,
    description: "Intitulé du code NAF",
  },
  romes: {
    type: [String],
    default: null,
    description: "Liste des codes ROMEs au sein de l'entreprise",
  },
  numero_rue: {
    type: String,
    default: null,
    description: "Numéro dans la rue",
  },
  libelle_rue: {
    type: String,
    default: null,
    description: "Nom de la rue",
  },
  code_commune: {
    type: String,
    default: null,
    description: "Code commune INSEE",
  },
  code_postal: {
    type: String,
    default: null,
    description: "Code postal",
  },
  email: {
    type: String,
    default: null,
    description: "Adresse email de contact",
  },
  telephone: {
    type: String,
    default: null,
    description: "Numéro de téléphone de contact",
  },
  tranche_effectif: { type: String, default: null, description: "Tranche effectif de l'entreprise" },
  website: {
    type: String,
    default: null,
    description: "URL du site Internet",
  },

  created_at: {
    type: Date,
    default: Date.now,
    description: "La date création de la demande",
  },
  last_update_at: {
    type: Date,
    default: Date.now,
    description: "Date de dernières mise à jour",
  },
};

module.exports = companySchema;
