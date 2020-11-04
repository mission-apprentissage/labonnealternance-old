const { Client } = require("@elastic/elasticsearch");
const { AmazonConnection } = require("aws-elasticsearch-connector");
const config = require("config");
const getClientOptions = (envName) => {
  switch (envName) {
    case "production":
    case "recette":
      return {
        node: `https://${config.private.esUrl}`,
        Connection: AmazonConnection,
        awsConfig: {
          credentials: {
            accessKeyId: config.private.awsAccessKeyId,
            secretAccessKey: config.private.awsAccessSecretKey,
          },
        },
      };
    case "local":
    default:
      return { node: `http://${config.private.esUrl}` };
  }
};

const createEsInstance = (stage = null) => {
  const options = getClientOptions(stage || config.env);
  const client = new Client({
    ...options,
    maxRetries: 5,
    requestTimeout: 60000,
  });

  return client;
};

let clientDefault = createEsInstance();

// To keep singleton
let clientProd = null;
let clientDev = null;
let clientLocal = null;

const getElasticInstance = (envName = null) => {
  if (!envName) {
    return clientDefault;
  }
  switch (envName) {
    case "production": {
      if (!clientProd) {
        clientProd = createEsInstance("production");
      }
      return clientProd;
    }
    case "recette": {
      if (!clientDev) {
        clientDev = createEsInstance("recette");
      }
      return clientDev;
    }
    case "local":
    default: {
      if (!clientLocal) {
        clientLocal = createEsInstance("local");
      }
      return clientLocal;
    }
  }
};

module.exports = {
  getElasticInstance,
};
