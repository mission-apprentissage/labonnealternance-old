const _ = require("lodash");
const config = require("config");
const Sentry = require("@sentry/node");
const path = require("path");
const { Application } = require("../common/model");

const sendApplication = async ({ mailer, query, shouldCheckSecret }) => {
  if (shouldCheckSecret && !query.secret) {
    return { error: "secret_missing" };
  } else if (shouldCheckSecret && query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      console.log("sending application mail to : ", query.email);

      let application = new Application({
        applicant_email: query.applicant_email,
        applicant_first_name: query.applicant_first_name,
        applicant_last_name: query.applicant_last_name,
        applicant_phone: query.applicant_phone,
        message: query.message,
        company_siret: query.company_siret,
        company_email: query.company_email,
        company_name: query.company_name,
      });

      // Sends email to "candidate" and "formation"
      const [emailCandidat, emailCompany] = await Promise.all([
        mailer.sendEmail(
          application.applicant_email,
          `Votre candidature chez ${application.company_email}`,
          getEmailTemplate("mail-candidat"),
          application
        ),
        mailer.sendEmail(
          application.company_email,
          `Candidature spontanée via La bonne alternance`,
          getEmailTemplate("mail-spontanee"),
          application
        ),
      ]);

      application.to_applicant_message_id = emailCandidat.messageId;
      application.to_applicant_message_status = emailCandidat.accepted.length ? "accepted" : "rejected";
      application.to_company_message_id = emailCompany.messageId;
      application.to_company_message_status = emailCompany.accepted.length ? "accepted" : "rejected";

      await application.save();

      return { /*emailCandidat, emailCompany,*/ application };
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

const sendTestMail = async ({ mailer, query }) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      console.log("sending test mail to : ", query.email);

      const mailData = {
        user: {
          email: query.email,
        },
      };

      let result = await mailer.sendEmail(
        query.email,
        `Envoi mail de test`,
        getEmailTemplate("mail-candidat"),
        mailData
      );

      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

const getEmailTemplate = (type = "mail-candidat") => {
  return path.join(__dirname, `../assets/templates/${type}.mjml.ejs`);
};

module.exports = {
  sendTestMail,
  sendApplication,
};
