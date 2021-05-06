const domainesMetiers2Schema = {
  sous_domaine: {
    type: String,
    default: null,
    description: "Le sous-domaine d'un métier",
  },
  domaine: {
    type: String,
    default: null,
    description: "Le grand domaine d'un métier",
  },
  codes_romes: {
    type: [String],
    default: [],
    description: "Les codes Romes associés au métier",
  },
  intitules_romes: {
    type: [String],
    default: [],
    description: "Les libellés des codes ROMEs associés au métier",
  },
  codes_rncps: {
    type: [String],
    default: [],
    description: "Les codes RNCPs associés au métier",
  },
  intitules_rncps: {
    type: [String],
    default: [],
    description: "Les libellés des codes RNCPs associés au métier",
  },
  mots_clefs: {
    type: String,
    default: null,
    description: "Les mots clefs associés au métier",
  },
  mots_clefs_ligne: {
    type: String,
    default: null,
    description: "Les mots clefs associés à une ligne spécifique du métier",
  },
  mots_clefs_divers: {
    type: String,
    default: null,
    description: "Les mots clefs spécifiques",
  },
  appelations_romes: {
    type: [String],
    default: null,
    description: "Appelations associés à un code ROME",
  },
  codes_fap: {
    type: [String],
    default: null,
    description: "Liste des codes FAP",
  },
  intitules_fap: {
    type: String,
    default: null,
    description: "Mots clefs issus des libellés FAP",
  },
  mots_clefs_domaine_onisep: {
    type: String,
    default: null,
    description: "Les mots clefs provenant des domaines et sous-domaines onisep",
  },
  couples_romes_metiers: {
    type: [Object],
    default: [],
    description: "Couples codes ROMEs / intitulés correspondants au métier",
  },
  created_at: {
    type: Date,
    default: Date.now,
    description: "Date d'ajout en base de données",
  },
  last_update_at: {
    type: Date,
    default: Date.now,
    description: "Date de dernières mise à jour",
  },
};

module.exports = domainesMetiers2Schema;
