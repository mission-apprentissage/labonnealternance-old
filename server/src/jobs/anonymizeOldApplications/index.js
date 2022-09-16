const anonymizeOldApplications = require("./anonymizeOldApplications");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await anonymizeOldApplications({ query: {} });
});
