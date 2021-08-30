const updateDiplomesMetiers = require("./updateDiplomesMetiers");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await updateDiplomesMetiers();
});
