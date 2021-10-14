// const _ = require("lodash");
const Yup = require("yup");

const validateSendApplication = async (validable) => {
  let schema = Yup.object().shape({
    lastName: Yup.string().max(15, "⚠ Doit avoir 15 caractères ou moins").required("⚠ Le prénom est requis."),
  });
  await schema.validate(validable).catch(function () {
    throw "error - validation of data failed";
  });
};

module.exports = {
  validateSendApplication,
};
