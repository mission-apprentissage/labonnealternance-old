const _ = require("config");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");

const SibApiV3Sdk = require("sib-api-v3-sdk");
const config = require("config");

const updateBlockedEmails = async () => {
  logMessage("info", `Début mise à jour blacklist sendinblue`);

  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.private.smtp.sendinblueApiKey;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let opts = {
    startDate: "2021-01-01",
    endDate: "2021-01-01",
    limit: 50,
    offset: 0,
    senders: ["example@example.com"],
  };

  apiInstance.getTransacBlockedContacts(opts).then(
    function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    },
    function (error) {
      console.error(error);
    }
  );
};

let running = false;

module.exports = async () => {
  if (!running) {
    running = true;

    try {
      logMessage("info", " -- Import blocked email addresses -- ");

      await updateBlockedEmails();

      logMessage("info", `Fin traitement`);

      running = false;

      notifyToSlack(`Mise à jour des adresses emails bloquées terminée`);

      return {
        result: "Mise à jour des adresses emails bloquées terminée",
      };
    } catch (err) {
      logMessage("error", err);
      let error_msg = _.get(err, "meta.body") ?? err.message;
      running = false;
      notifyToSlack(`ECHEC mise à jour des adresses emails bloquées. ${error_msg}`);
      return { error: error_msg };
    }
  } else {
    logMessage("info", "Mise à jour des adresses emails bloquées déjà en cours");
  }
};
