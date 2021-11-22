/**
 * Example of unit testing a logic module
 */
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));
const {
  validateSendApplication,
  validateFeedbackApplication,
} = require("../../src/service/validateSendApplication.js");

describe(__filename, () => {
  it("validateSendApplication : Echoue si mauvais argument passé en param", async () => {
    await expect(validateSendApplication()).to.be.rejectedWith("error - validation of data failed");
  });
  it("validateSendApplication : Echoue si un des champs ne passe pas la validation", async () => {
    await expect(
      validateSendApplication({ lastName: "too long name, more than 15 characters, will fail" })
    ).to.be.rejectedWith("error - validation of data failed");
  });
  it("validateSendApplication : Passe si tous les champs sont valides", async () => {
    expect(
      await validateSendApplication({
        firstName: "jane",
        lastName: "doe",
        fileName: "any.pdf",
        email: "jane.doe@example.com",
        phone: "0606060606",
      })
    ).to.equal("ok");
  });
  it("validateFeedbackApplication : Echoue si mauvais argument passé en param", async () => {
    await expect(validateFeedbackApplication()).to.be.rejectedWith("error - validation of data failed");
  });
  it("validateFeedbackApplication : Echoue si un des champs ne passe pas la validation", async () => {
    await expect(validateFeedbackApplication({ id: "aaa", iv: "aaa", avis: "avis non conforme" })).to.be.rejectedWith(
      "error - validation of data failed"
    );
  });
  it("validateFeedbackApplication : Passe si tous les champs sont valides", async () => {
    expect(
      await validateFeedbackApplication({
        id: "aaaa",
        iv: "aaaa",
        avis: "utile",
      })
    ).to.equal("ok");
  });
});
