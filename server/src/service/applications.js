const _ = require("lodash");
const config = require("config");
const Sentry = require("@sentry/node");
const path = require("path");

const sendApplication = async ({ mailer, query, shouldCheckSecret }) => {
  /*const [emailCandidat, emailCfa] = await Promise.all([
        mailer.sendEmail(
          user.email,
          `Le CFA a bien reçu votre demande de RDV via ${referrerObj.full_name}`,
          getEmailTemplate("mail-candidat"),
          mailData
        ),
        mailer.sendEmail(
          widgetParameter.email_rdv,
          `[RDV via ${referrerObj.full_name}] Un candidat souhaite être recontacté`,
          getEmailTemplate("mail-formation"),
          mailData
        ),
      ]);*/

  if (shouldCheckSecret && !query.secret) {
    return { error: "secret_missing" };
  } else if (shouldCheckSecret && query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      console.log("sending application mail to : ", query.email);

      const mailData = {
        applicant: {
          email: query.email,
          lastName: query.lastName,
          firstName: query.firstName,
          phone: query.phone,
        },
        company: {
          siret: query.siret,
          name: query.companyName,
          email: query.companyEmail,
        },
        message: query.message,
      };

      // Sends email to "candidate" and "formation"
      const [emailCandidat, emailCompany] = await Promise.all([
        mailer.sendEmail(
          mailData.applicant.email,
          `Votre candidature chez ${mailData.company.email}`,
          getEmailTemplate("mail-candidat"),
          mailData
        ),
        mailer.sendEmail(
          mailData.company.email,
          `Candidature spontanée via La bonne alternance`,
          getEmailTemplate("mail-spontanee"),
          mailData
        ),
      ]);

      return { emailCandidat, emailCompany };
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
