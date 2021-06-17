const genererUrlDediees = require("./genererUrlDediees");
const { runScript } = require("../scriptWrapper");

runScript(async () => {
  await genererUrlDediees();
});
