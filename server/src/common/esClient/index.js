const { Client } = require("@elastic/elasticsearch");
const { AmazonConnection } = require("aws-elasticsearch-connector");
const config = require("config");
const getClientOptions = (envName, index) => {
  switch (envName) {
    case "production":
    case "recette":
      return index === "domainesmetiers"
        ? {
            node: config.private.domainesMetiersEsUrl,
            Connection: AmazonConnection,
            awsConfig: {
              credentials: {
                accessKeyId: config.private.awsAccessKeyId,
                secretAccessKey: config.private.awsAccessSecretKey,
              },
            },
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

  return client;
};

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
};
