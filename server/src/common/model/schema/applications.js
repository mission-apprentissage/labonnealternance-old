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
  applicant_file_name: {
    type: String,
    default: null,
    description: "Nom du fichier du CV du candidat",
  },
  message: {
    type: String,
    default: null,
    required: false,
    description: "Le message envoyé par le candidat",
  },
  applicant_opinion: {
    type: String,
    default: null,
    required: false,
    description: "L'avis donné par le candidat",
  },
  applicant_feedback: {
    type: String,
    default: null,
    required: false,
    description: "Un commentaire concernant le produit",
  },
  applicant_feedback_date: {
    type: Date,
    default: null,
    required: false,
    description: "Date d'opinion donnée",
  },
  company_opinion: {
    type: String,
    default: null,
    required: false,
    description: "L'avis donné par la société",
  },
  company_intention: {
    type: String,
    default: null,
    required: false,
    description: "L'intention de la société vis à vis du candidat",
  },
  company_intention_date: {
    type: Date,
    default: null,
    required: false,
    description: "Date d'intention donnée",
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
  company_naf: {
    type: String,
    default: null,
    description: "Le label naf de la société",
  },
  company_address: {
    type: String,
    default: null,
    description: "L'adresse physique de la société",
  },
  company_type: {
    type: String,
    default: null,
    description: "Le type de société / offre au sens source d'info La Bonne Alternance. Ex : lba, lbb, matcha, pejob",
  },
  job_title: {
    type: String,
    default: null,
    description: "Le titre de l'offre à laquelle répond le candidat",
  },
  job_id: {
    type: String,
    default: null,
    description: "L'id externe de l'offre d'emploi",
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
