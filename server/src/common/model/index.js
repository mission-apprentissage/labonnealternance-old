const { mongooseInstance } = require("../mongodb");
const { mongoosastic, getElasticInstance } = require("../esClient");
const schema = require("../model/schema");

const createModel = (modelName, descriptor, options = {}) => {
  const schema = new mongooseInstance.Schema(descriptor);
  if (options.esIndexName) {
    schema.plugin(mongoosastic, { esClient: getElasticInstance(), index: options.esIndexName });
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
  DomainesMetiers2: createModel("domainesmetiers2", schema.domainesMetiers2Schema, {
    esIndexName: "domainesmetiers2",
  }),
};
