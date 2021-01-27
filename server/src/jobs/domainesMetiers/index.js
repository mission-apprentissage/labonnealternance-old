const domainesMetiers = require("./domainesMetiers");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await domainesMetiers();
});
