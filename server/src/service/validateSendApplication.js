const Yup = require("yup");

const validateSendApplication = async (validable) => {
  let schema = Yup.object().shape({
    fileName: Yup.string().nullable().required("⚠ La pièce jointe est requise"),
    firstName: Yup.string().max(15, "⚠ Doit avoir 15 caractères ou moins").required("⚠ Le prénom est requis."),
    lastName: Yup.string().max(20, "⚠ Doit avoir 20 caractères ou moins").required("⚠ Le nom est requis."),
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

module.exports = {
  validateSendApplication,
};
