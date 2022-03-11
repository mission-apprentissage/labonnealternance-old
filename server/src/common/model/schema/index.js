const domainesMetiersSchema = require("./domainesmetiers");
const diplomesMetiersSchema = require("./diplomesmetiers");
const apiCallSchema = require("./ApiCall");
const applicationSchema = require("./applications");
const sourceFormationsSchema = require("./sourceFormationsSchema");
const mnaFormationSchema = require("./mnaFormation/mnaFormation");
const geoLocationSchema = require("./lbb/geoLocations");
const bonneBoiteSchema = require("./lbb/bonneBoite");
const emailBlacklist = require("./lbb/emailBlacklist");
const opco = require("./lbb/opco");

module.exports = {
  domainesMetiersSchema,
  diplomesMetiersSchema,
  applicationSchema,
  apiCallSchema,
  mnaFormationSchema,
  sourceFormationsSchema,
  bonneBoiteSchema,
  geoLocationSchema,
  emailBlacklist,
  opco,
};
