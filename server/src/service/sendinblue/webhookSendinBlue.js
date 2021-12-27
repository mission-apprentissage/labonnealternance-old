const config = require("config");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = config.private.smtp.sendinblueApiKey;

let apiInstance = new SibApiV3Sdk.WebhooksApi();

let createWebhook = new SibApiV3Sdk.CreateWebhook();

createWebhook = {
  description: "Changement d'état de candidature LBA",
  url: "https://labonnealternance-recette.apprentissage.beta.gouv.fr/api/application/webhook", // config.publicUrl
  events: ["sent", "delivered", "hardBounce", "blocked", "invalid", "click", "uniqueOpened"],
  type: "transactional",
};

const initWebhook = () => {
  apiInstance.createWebhook(createWebhook).then(
    function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    },
    function (error) {
      console.error(error.response.res.text);
    }
  );
};

module.exports = {
  initWebhook,
};
