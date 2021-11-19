const Yup = require("yup");

const validateSendApplication = async (validable) => {
  let schema = Yup.object().shape({
    fileName: Yup.string().nullable().required("⚠ La pièce jointe est requise"),
    firstName: Yup.string().max(50, "⚠ Doit avoir 50 caractères ou moins").required("⚠ Le prénom est requis."),
    lastName: Yup.string().max(50, "⚠ Doit avoir 50 caractères ou moins").required("⚠ Le nom est requis."),
    email: Yup.string().email("⚠ Adresse e-mail invalide.").required("⚠ L'adresse e-mail est requise."),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "⚠ Le numéro de téléphone doit avoir exactement 10 chiffres")
      .required("⚠ Le téléphone est requis"),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
  return "ok";
};

const validateCompanyEmail = async (validable) => {
  let schema = Yup.object().shape({
    companyEmail: Yup.string()
      .email("⚠ Adresse e-mail société invalide.")
      .required("⚠ L'adresse e-mail société est requise."),
    cryptedEmail: Yup.string().email("⚠ Adresse e-mail chiffrée invalide."),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
  return "ok";
};

const validateFeedbackApplication = async (validable) => {
  let schema = Yup.object().shape({
    id: Yup.string().required("⚠ ID manquant."),
    iv: Yup.string().required("⚠ IV manquant."),
    avis: Yup.string()
      .required("⚠ Avis manquant.")
      .matches(/(neutre|utile|pasUtile)/, "⚠ Valeur non conforme"),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
  return "ok";
};

const validateFeedbackApplicationComment = async (validable) => {
  let schema = Yup.object().shape({
    id: Yup.string().required("⚠ ID manquant."),
    iv: Yup.string().required("⚠ IV manquant."),
    comment: Yup.string().required("⚠ Commentaire manquant."),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
  return "ok";
};

const validateIntentionApplication = async (validable) => {
  let schema = Yup.object().shape({
    id: Yup.string().required("⚠ ID manquant."),
    iv: Yup.string().required("⚠ IV manquant."),
    intention: Yup.string()
      .required("⚠ Avis manquant.")
      .matches(/(refus|ne_sais_pas|entretien)/, "⚠ Valeur non conforme"),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
  return "ok";
};

module.exports = {
  validateSendApplication,
  validateCompanyEmail,
  validateFeedbackApplication,
  validateFeedbackApplicationComment,
  validateIntentionApplication,
};
