const updateDomainesMetiers = require("./updateDomainesMetiers");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await updateDomainesMetiers();
});
