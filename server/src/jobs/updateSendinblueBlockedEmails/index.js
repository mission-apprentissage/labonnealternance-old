const updateSendinblueBlockedEmails = require("./updateSendinblueBlockedEmails");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await updateSendinblueBlockedEmails();
});
