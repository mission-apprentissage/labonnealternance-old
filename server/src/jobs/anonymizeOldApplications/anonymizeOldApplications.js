const { get } = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");
const { Application } = require("../../common/model");

const anonymizeApplications = async () => {
  logMessage("info", `Début anonymisation`);

  let lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  const res = await Application.updateMany(
    { created_at: { $lte: lastYear }, is_anonymized: { $ne: true } },
    {
      $set: {
        is_anonymized: true,
        last_update_at: new Date(),
        applicant_email: null,
        applicant_first_name: null,
        applicant_last_name: null,
        applicant_phone: null,
        applicant_file_name: null,
        message: null,
        company_feedback: null,
        applicant_feedback: null,
        company_email: null,
        company_name: null,
        company_siret: null,
        company_address: null,
        job_title: null,
        job_id: null,
        to_applicant_message_id: null,
        to_applicant_message_status: null,
        to_company_message_id: null,
        to_company_message_status: null,
        to_applicant_update_message_id: null,
        to_company_update_message_status: null,
      },
    }
  );

  return res.nModified;
};

let running = false;

module.exports = async () => {
  if (!running) {
    running = true;

    try {
      logMessage("info", " -- Anonymisation des candidatures de plus de un (1) an -- ");

      const nModified = await anonymizeApplications();

      logMessage("info", `Fin traitement`);

      notifyToSlack(
        `Anonymisation des candidatures de plus de un an terminée. ${nModified} candidature(s) anonymisée(s).`
      );

      running = false;

      return {
        result: "Anonymisation des candidatures terminée",
      };
    } catch (err) {
      logMessage("error", err);
      let error_msg = get(err, "meta.body") ?? err.message;
      running = false;
      notifyToSlack(`ECHEC anonymisation des candidatures ${error_msg}`);
      return { error: error_msg };
    }
  } else {
    logMessage("info", "Anonymisation des candidatures déjà en cours");
  }
};
