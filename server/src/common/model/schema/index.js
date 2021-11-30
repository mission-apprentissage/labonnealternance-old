const domainesMetiersSchema = require("./domainesmetiers");
const diplomesMetiersSchema = require("./diplomesmetiers");
const apiCallSchema = require("./ApiCall");
const applicationSchema = require("./applications");
const sourceFormationsSchema = require("./sourceFormationsSchema");
const mnaFormationSchema = require("./mnaFormation/mnaFormation");
const romeNafSchema = require("./lbb/romeNaf");
const companyScoreSchema = require("./lbb/companyScore");
const bonneBoiteSchema = require("./lbb/bonneBoite");

module.exports = {
  domainesMetiersSchema,
  diplomesMetiersSchema,
  applicationSchema,
  apiCallSchema,
  mnaFormationSchema,
  sourceFormationsSchema,
  romeNafSchema,
  companyScoreSchema,
  bonneBoiteSchema,
};
