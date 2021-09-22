const applicationSchema = {
  applicant_email: {
    type: String,
    default: null,
    description: "Adresse email candidat",
  },
  applicant_first_name: {
    type: String,
    default: null,
    description: "Prénom du candidat",
  },
  applicant_last_name: {
    type: String,
    default: null,
    description: "Nom du candidat",
  },
  applicant_phone: {
    type: String,
    default: null,
    description: "Téléphone du candidat",
  },
  application_id: {
    type: String,
    default: null,
    description: "L'identifiant de la candidature",
  },
  message: {
    type: String,
    default: null,
    required: false,
    description: "Le message envoyé par le candidat",
  },
  company_siret: {
    type: String,
    default: null,
    description: "Le siret de l'établissement",
  },
  company_email: {
    type: String,
    default: null,
    description: "L'adresse email de destination de la candidature",
  },
  company_name: {
    type: String,
    default: null,
    description: "Le nom de la société",
  },
  to_applicant_message_id: {
    type: String,
    default: null,
    description: "Identifiant chez le transporteur du mail envoyé au candidat",
  },
  to_applicant_message_status: {
    type: String,
    default: null,
    description: "Statut du mail envoyé au candidat",
  },
  to_company_message_id: {
    type: String,
    default: null,
    description: "Identifiant chez le transporteur du mail envoyé à l'entreprise",
  },
  to_company_message_status: {
    type: String,
    default: null,
    description: "Statut du mail envoyé à l'entreprise",
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

module.exports = applicationSchema;
