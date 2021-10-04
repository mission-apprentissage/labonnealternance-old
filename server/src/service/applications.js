const config = require("config");
const Sentry = require("@sentry/node");
const path = require("path");
const { Application } = require("../common/model");

const images = {
  images: {
    //logo: `${config.publicUrl}/images/emails/logo_lba.png`,
    logo: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/logo_lba.png`,
    logoRF: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/logo_rf.png`,
    icoInfo: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/ico_info.png`,
    icoCandidat: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/ico_candidat.png`,
  },
};

const sendApplication = async ({ mailer, query, shouldCheckSecret }) => {
  if (shouldCheckSecret && !query.secret) {
    return { error: "secret_missing" };
  } else if (shouldCheckSecret && query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let application = new Application({
        applicant_email: query.applicant_email,
        applicant_first_name: query.applicant_first_name,
        applicant_last_name: query.applicant_last_name,
        applicant_phone: query.applicant_phone,
        message: query.message,
        company_siret: query.company_siret,
        company_email: query.company_email,
        company_name: query.company_name,
        company_naf: query.company_naf,
        company_address: query.company_address,
      });

      //console.log("application ", { ...application._doc, ...images }, { ...application._doc, ...images }.images.logo);

      // Sends ack email to "candidate" and application email to "company"
      const [/*emailCandidat,*/ emailCompany] = await Promise.all([
        /*mailer.sendEmail(
          application.applicant_email,
          `Votre candidature chez ${application.company_email}`,
          getEmailTemplate("mail-candidat"),
          { ...application._doc, ...images }
        ) ,*/
        mailer.sendEmail(
          application.company_email,
          `Candidature spontanée via La bonne alternance`,
          getEmailTemplate("mail-spontanee"),
          { ...application._doc, ...images }
        ),
      ]);

      //application.to_applicant_message_id = emailCandidat.messageId;
      //application.to_applicant_message_status = emailCandidat.accepted.length ? "accepted" : "rejected";
      application.to_company_message_id = emailCompany.messageId;
      application.to_company_message_status = emailCompany.accepted.length ? "accepted" : "rejected";

      await application.save();

      return { /*emailCandidat , */ emailCompany, application };
    } catch (err) {
      Sentry.captureException(err);
      return { error: "error_sending_application" };
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
        query.applicant_email,
        "Envoi mail de test",
        getEmailTemplate("mail-candidat"),
        mailData
      );

      return result;
    } catch (err) {
      Sentry.captureException(err);
      return { error: "error_sending_test_mail" };
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
