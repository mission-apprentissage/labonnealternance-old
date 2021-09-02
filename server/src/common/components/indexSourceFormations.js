const { SourceFormations } = require("../model");
const { Client } = require("@elastic/elasticsearch");
const _ = require("lodash");
const logger = require("../logger");
const Sentry = require("@sentry/node");

const esClient = new Client({ node: "http://localhost:9200" });

const getCurrentFormationsSourceIndex = async () => {
  try {
    const sourceFormation = await SourceFormations.find({});

    console.log("getCurrentFormationsSource ", sourceFormation);

    return sourceFormation[0]?.currentIndex || "convertedformation_1";
  } catch (err) {
    return "convertedformation_1";
  }
};

const updateFormationsSourceIndex = async (newSource) => {
  try {
    let currentSourceFormation = await SourceFormations.find({});

    let sourceFormation = null;

    if (currentSourceFormation && currentSourceFormation[0]) {
      console.log("source actuelle ", currentSourceFormation);
      sourceFormation = currentSourceFormation[0];
      sourceFormation.currentIndex = newSource;
      sourceFormation.last_update_at = new Date();
    } else {
      console.log("pas encore de source sauvée ");
      sourceFormation = new SourceFormations({
        currentIndex: newSource,
      });
    }
    let saveResult = await sourceFormation.save();

    console.log("source sauvée ", saveResult);
  } catch (err) {
    console.log("error saving formationSource ", err);
  }
};

const updateFormationsIndexAlias = async ({ masterIndex, indexToUnAlias }) => {
  try {
    await esClient.indices.putAlias({
      index: masterIndex,
      name: "convertedformations",
    });
    await esClient.indices.deleteAlias({
      index: indexToUnAlias,
      name: "convertedformations",
    });
  } catch (err) {
    Sentry.captureException(err);
    let error_msg = _.get(err, "meta.body") ?? err.message;

    if (_.get(err, "meta.meta.connection.status") === "dead") {
      logger.error(`Elastic search is down or unreachable. error_message=${error_msg}`);
    } else {
      logger.error(`Error getting romes from keyword. error_message=${error_msg}`);
    }

    return { error: error_msg, metiers: [] };
  }
};

module.exports = {
  getCurrentFormationsSourceIndex,
  updateFormationsSourceIndex,
  updateFormationsIndexAlias,
};
