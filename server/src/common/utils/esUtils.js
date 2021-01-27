const logger = require("../logger");
const { getElasticInstance } = require("../esClient");

const rebuildIndex = async (model, { skipNotFound } = { skipNotFound: false }) => {
  let client = getElasticInstance();
  let index = model.collection.collectionName; // Assume model name = index name

  if (!skipNotFound) {
    logger.info(`Removing '${index}' index...`);
    await client.indices.delete({ index });
  }

  logger.info(`Re-creating '${index}' index with mapping...`);
  let requireAsciiFolding = true;
  await model.createMapping(requireAsciiFolding); // this explicit call of createMapping insures that the geo points fields will be treated accordingly during indexing

  logger.info(`Syncing '${index}' index ...`);
  await model.synchronize();
};

module.exports.rebuildIndex = rebuildIndex;
