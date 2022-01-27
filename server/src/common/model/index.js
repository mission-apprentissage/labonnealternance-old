const { mongooseInstance } = require("../mongodb");
const { mongoosastic, getElasticInstance } = require("../esClient");
const schema = require("../model/schema");

const createModel = (modelName, descriptor, options = {}) => {
  const schema = new mongooseInstance.Schema(descriptor);

  if (options.esIndexName) {
    schema.plugin(mongoosastic, { esClient: getElasticInstance(), index: options.esIndexName });
  }

  if (options.esIndexName || options.paginate) {
    schema.plugin(require("mongoose-paginate"));
  }

  if (options.createMongoDBIndexes) {
    options.createMongoDBIndexes(schema);
  }

  return mongooseInstance.model(modelName, schema);
};

module.exports = {
  DomainesMetiers: createModel("domainesmetiers", schema.domainesMetiersSchema, {
    esIndexName: "domainesmetiers",
  }),
  ConvertedFormation_0: createModel("convertedformation_0", schema.mnaFormationSchema, {
    esIndexName: "convertedformation_0",
  }),
  ConvertedFormation_1: createModel("convertedformation_1", schema.mnaFormationSchema, {
    esIndexName: "convertedformation_1",
  }),
  DiplomesMetiers: createModel("diplomesmetiers", schema.diplomesMetiersSchema, {
    esIndexName: "diplomesmetiers",
  }),
  ApiCalls: createModel("apicalls", schema.apiCallSchema),
  Application: createModel("applications", schema.applicationSchema, {
    paginate: true,
  }),
  SourceFormations: createModel("sourceformations", schema.sourceFormationsSchema),
  GeoLocation: createModel("geolocation", schema.geoLocationSchema),
  EmailBlacklist: createModel("emailblacklist", schema.emailBlacklist),
  BonnesBoites: createModel("bonnesboites", schema.bonneBoiteSchema, {
    esIndexName: "bonnesboites",
  }),
};
