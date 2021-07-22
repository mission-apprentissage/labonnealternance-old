const _ = require("lodash");
const config = require("config");
const updateDiplomesMetiers = require("../jobs/diplomesMetiers/updateDiplomesMetiers");
const Sentry = require("@sentry/node");

const updateDiplomesMetiersQuery = async (query) => {
  if (!query.secret) {
    return { error: "secret_missing" };
  } else if (query.secret !== config.private.secretUpdateRomesMetiers) {
    return { error: "wrong_secret" };
  } else {
    try {
      let result = await updateDiplomesMetiers();
      return result;
    } catch (err) {
      Sentry.captureException(err);

      let error_msg = _.get(err, "meta.body") ?? err.message;

      return { error: error_msg };
    }
  }
};

module.exports = {
  updateDiplomesMetiersQuery,
};
