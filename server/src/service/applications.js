const config = require("config");
const Sentry = require("@sentry/node");
const path = require("path");
const { ObjectId } = require("mongodb");
const { prepareMessageForMail } = require("../common/utils/fileUtils");
const { encryptIdWithIV, decryptWithIV } = require("../common/utils/encryptString");
const { Application } = require("../common/model");
const {
  validateSendApplication,
  validateCompanyEmail,
  validateFeedbackApplication,
  validateFeedbackApplicationComment,
} = require("./validateSendApplication");

const images = {
  images: {
    //logo: `${config.publicUrl}/images/emails/logo_lba.png`,
    logo: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/logo_lba.png`,
    logoRF: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/logo_rf.png`,
    icoInfo: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/icone_info.png`,
    icoCandidat: `https://labonnealternance-recette.apprentissage.beta.gouv.fr/images/emails/icone_candidat.png`,
  },
};

const initApplication = (query, companyEmail) => {
  return new Application({
    applicant_file_name: query.applicant_file_name,
    applicant_email: query.applicant_email,
    applicant_first_name: query.applicant_first_name,
    applicant_last_name: query.applicant_last_name,
    applicant_phone: query.applicant_phone,
    message: prepareMessageForMail(query.message),
    company_siret: query.company_siret,
    company_email: companyEmail,
    company_name: query.company_name,
    company_naf: query.company_naf,
    company_address: query.company_address,
    company_type: query.company_type,
    job_title: query.job_title,
    job_id: query.job_id,
  });
};

const getEmailTemplates = (applicationType) => {
  if (applicationType === "matcha") {
    return {
      candidat: "mail-candidat-matcha",
      entreprise: "mail-candidature",
    };
  } else {
    return {
      candidat: "mail-candidat",
      entreprise: "mail-candidature",
    };
  }
};

const sendApplication = async ({ mailer, query, shouldCheckSecret }) => {
  if (shouldCheckSecret && !query.secret) {
    return { error: "secret_missing" };
  } else if (shouldCheckSecret && query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    await validateSendApplication({
      fileName: query.applicant_file_name,
      email: query.applicant_email,
      firstName: query.applicant_first_name,
      lastName: query.applicant_last_name,
      phone: query.applicant_phone,
    });

    let companyEmail = shouldCheckSecret ? query.company_email : decryptWithIV(query.company_email, query.iv); // utilisation email de test ou decrypt vrai mail crypté
    let cryptedEmail = shouldCheckSecret ? decryptWithIV(query.crypted_company_email, query.iv) : ""; // présent uniquement pour les tests utilisateurs

    await validateCompanyEmail({
      companyEmail,
      cryptedEmail,
    });

    try {
      let application = initApplication(query, companyEmail);

      let encryptedId = encryptIdWithIV(application.id);

      const emailTemplates = getEmailTemplates(query.company_type);

      const fileContent = query.applicant_file_content;

      // Sends acknowledge email to "candidate" and application email to "company"
      const [emailCandidat, emailCompany] = await Promise.all([
        mailer.sendEmail(
          application.applicant_email,
          `Votre candidature chez ${application.company_name}`,
          getEmailTemplate(emailTemplates.candidat),
          { ...application._doc, ...images, ...encryptedId },
          [
            {
              filename: application.applicant_file_name,
              path: fileContent,
            },
          ]
        ),
        mailer.sendEmail(
          application.company_email,
          `Candidature spontanée pour un poste en alternance`,
          getEmailTemplate(emailTemplates.entreprise),
          { ...application._doc, ...images },
          [
            {
              filename: application.applicant_file_name,
              path: fileContent,
            },
          ]
        ),
      ]);

      application.to_applicant_message_id = emailCandidat.messageId;
      application.to_applicant_message_status = emailCandidat.accepted.length ? "accepted" : "rejected";
      application.to_company_message_id = emailCompany.messageId;
      application.to_company_message_status = emailCompany.accepted.length ? "accepted" : "rejected";

      await application.save();

      return { result: "ok", message: "messages sent" };
    } catch (err) {
      console.log("err ", err);
      Sentry.captureException(err);
      return { error: "error_sending_application" };
    }
  }
};

const saveApplicationFeedback = async ({ query }) => {
  await validateFeedbackApplication({
    id: query.id,
    iv: query.iv,
    avis: query.avis,
  });

  let decryptedId = decryptWithIV(query.id, query.iv);

  try {
    await Application.findOneAndUpdate(
      { _id: ObjectId(decryptedId) },
      { applicant_opinion: query.avis, applicant_feedback_date: new Date() }
    );

    return { result: "ok", message: "opinion registered" };
  } catch (err) {
    console.log("err ", err);
    Sentry.captureException(err);
    return { error: "error_saving_opinion" };
  }
};

const saveApplicationFeedbackComment = async ({ query }) => {
  await validateFeedbackApplicationComment({
    id: query.id,
    iv: query.iv,
    comment: query.comment,
  });

  let decryptedId = decryptWithIV(query.id, query.iv);

  try {
    await Application.findOneAndUpdate(
      { _id: ObjectId(decryptedId) },
      { applicant_feedback: query.comment, applicant_feedback_date: new Date() }
    );

    return { result: "ok", message: "comment registered" };
  } catch (err) {
    console.log("err ", err);
    Sentry.captureException(err);
    return { error: "error_saving_comment" };
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
  saveApplicationFeedback,
  saveApplicationFeedbackComment,
};
