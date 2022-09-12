const _ = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");
const { Application } = require("../../common/model");

const anonymizeApplications = async () => {
  logMessage("info", `Début anonymisation`);

  let lastYear = new Date();
  //lastYear.setFullYear(lastYear.getFullYear() - 1);
  lastYear.setMonth(lastYear.getMonth() - 2);

  /*await Application.findAnUpdate(
    { created_at: { $lte: lastYear }, anonymized: true },
    { applicant_feedback: query.comment, applicant_feedback_date: new Date() }
  );*/
  /*
  mise 

  */
  const res = await Application.find({ created_at: { $lte: lastYear }, anonymized: { $ne: false } });

  console.log("res : ", lastYear, res.length);
};

let running = false;
let anonymizedApplicationCount = 0;

module.exports = async ({ query }) => {
  if (!running) {
    running = true;
    anonymizedApplicationCount = 0;

    try {
      logMessage("info", " -- Anonymisation des candidatures de plus de un (1) an -- ");

      await anonymizeApplications({ query });

      logMessage("info", `Fin traitement`);

      notifyToSlack(
        `Anonymisation des canidatures de plus de un an terminée. ${anonymizedApplicationCount} candidature(s) anonymisée(s).`
      );

      running = false;

      return {
        result: "Anonymisation des candidatures terminée",
      };
    } catch (err) {
      logMessage("error", err);
      let error_msg = _.get(err, "meta.body") ?? err.message;
      running = false;
      notifyToSlack(`ECHEC anonymisation des candidatures ${error_msg}`);
      return { error: error_msg };
    }
  } else {
    logMessage("info", "Anonymisation des candidatures déjà en cours");
  }
};
