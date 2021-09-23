const _ = require("lodash");
const config = require("config");
const updateFormations = require("../jobs/importFormationsCatalogue/importFormationsCatalogue");
const Sentry = require("@sentry/node");

const updateFormationsQuery = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let onlyChangeMasterIndex = query?.onlyChangeMasterIndex ? true : false;

      let result = await updateFormations(onlyChangeMasterIndex);
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

module.exports = {
  updateFormationsQuery,
};
