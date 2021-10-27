const domainesMetiersSchema = require("./domainesmetiers");
const diplomesMetiersSchema = require("./diplomesmetiers");
const apiCallSchema = require("./ApiCall");
const applicationSchema = require("./applications");
const sourceFormationsSchema = require("./sourceFormationsSchema");
const mnaFormationSchema = require("./mnaFormation/mnaFormation");

module.exports = {
  domainesMetiersSchema,
  diplomesMetiersSchema,
  applicationSchema,
  apiCallSchema,
  mnaFormationSchema,
  sourceFormationsSchema,
};
