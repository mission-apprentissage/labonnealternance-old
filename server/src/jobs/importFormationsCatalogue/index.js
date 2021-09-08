const importFormationsCatalogue = require("./importFormationsCatalogue");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await importFormationsCatalogue({ onlyChangeMasterIndex: true });
});
