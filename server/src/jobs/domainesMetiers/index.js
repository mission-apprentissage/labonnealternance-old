const updateDomainesMetiers = require("./updateDomainesMetiers");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  console.log("BEH");
  await updateDomainesMetiers();
});
