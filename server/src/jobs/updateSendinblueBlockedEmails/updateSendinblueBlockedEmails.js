const config = require("config");
const _ = require("lodash");
const { logMessage } = require("../../common/utils/logMessage");
const { notifyToSlack } = require("../../common/utils/slackUtils");
const { EmailBlacklist, BonnesBoites } = require("../../common/model/");

const SibApiV3Sdk = require("sib-api-v3-sdk");

const saveBlacklistEmails = async (contacts) => {
  //console.log("saving contacts : ", contacts.length);
  for (let i = 0; i < contacts.length; ++i) {
    //console.log(contacts[i].email);

    let email = contacts[i].email;
    let blackListedEmail = await EmailBlacklist.findOne({ email });
    if (!blackListedEmail) {
      let companies = await BonnesBoites.find({ email });
      await cleanCompanies(companies);

      blackListedEmail = new EmailBlacklist({
        email,
        source: "sendinblue",
      });
      await blackListedEmail.save();
    } else {
      console.log("trouvé ! ", blackListedEmail);
    }
  }
};

const cleanCompanies = async (companies) => {
  if (companies && companies.length) {
    for (let i = 0; i < companies.length; ++i) {
      await cleanCompany(companies[i]);
    }
  }
};

const cleanCompany = async (company) => {
  company.email = "";
  await company.save();
};

const updateBlockedEmails = async ({ query }) => {
  logMessage("info", `Début mise à jour blacklist sendinblue`);

  console.log("query : ", query);

  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = config.private.smtp.sendinblueApiKey;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth() < 9 ? "0" : ""}${today.getMonth() + 1}-${
    today.getDate() < 10 ? "0" : ""
  }${today.getDate()}`;
  const limit = 100;
  const senders = ["no-reply@apprentissage.beta.gouv.fr"];
  let total = 0;
  let offset = 0;
  let startDate = query.all ? null : todayStr;
  let endDate = query.all ? null : todayStr;

  let opts = {
    startDate,
    endDate,
    limit,
    offset,
    senders,
  };

  console.log("avant  ", opts);

  let result = await apiInstance.getTransacBlockedContacts(opts);

  total = result.count;

  if (!total) {
    return;
  }

  while (offset < total) {
    await saveBlacklistEmails(result.contacts);

    offset += limit;
    result = await apiInstance.getTransacBlockedContacts({ ...opts, offset });
  }

  console.log("après  ", offset, total, opts);
  /*.then(
  function (data) {
    //console.log("API called successfully. Returned data: ", data);
    console.log(data.count);
    console.log(data.contacts.length);
    console.log(data.contacts[5].email);
  },
  function (error) {
    console.error(error);
  }
);*/
};

let running = false;

module.exports = async ({ query }) => {
  if (!running) {
    running = true;

    try {
      logMessage("info", " -- Import blocked email addresses -- ");

      await updateBlockedEmails({ query });

      logMessage("info", `Fin traitement`);

      running = false;

      //notifyToSlack(`Mise à jour des adresses emails bloquées terminée`);

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
