const { Client } = require("@elastic/elasticsearch");
const ElasticsearchScrollStream = require("elasticsearch-scroll-stream");
const { transformObject, mergeStreams } = require("../utils/streamUtils");
const mongoosastic = require("./mongoosastic");
const config = require("config");

const getClientOptions = (envName, index) => {
  switch (envName) {
    case "production":
    case "recette":
      return index === "domainesmetiers"
        ? {
            node: config.private.domainesMetiersEsUrl,
          }
        : {
            node: config.private.esUrl,
          };
    case "local":
    default:
      return {
        node: `${index === "domainesmetiers" ? config.private.domainesMetiersEsUrl : config.private.esUrl}`,
      };
  }
};

const createEsInstance = (index = null) => {
  const options = getClientOptions(config.env, index);
  const client = new Client({
    ...options,
    maxRetries: 5,
    requestTimeout: 60000,
  });

  client.extend("searchDocumentsAsStream", () => {
    return (options) => {
      return mergeStreams(
        new ElasticsearchScrollStream(
          client,
          {
            scroll: "1m",
            size: "50",
            ...options,
          },
          ["_id"]
        ),
        transformObject((data) => {
          return JSON.parse(Buffer.from(data).toString());
        })
      );
    };
  });
  return client;
};
const clientDefault = createEsInstance();
const getElasticInstance = () => clientDefault;

let clientCatalogueFormations = createEsInstance("mnaformation");
let clientDomainesMetiers = createEsInstance("domainesmetiers");

const getDomainesMetiersES = () => {
  return clientDomainesMetiers;
};

const getCatalogueES = () => {
  return clientCatalogueFormations;
};

module.exports = {
  getCatalogueES,
  getDomainesMetiersES,
  getElasticInstance,
  mongoosastic,
};
