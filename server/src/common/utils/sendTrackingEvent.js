const { ApiCalls } = require("../../common/model");
const logger = require("../common/logger");

const trackEvent = async ({ action, label, value }) => {
  //visitor.event(category, action, label, value).send();

  logger.info("about to save event");
  try {
    let apiCall = new ApiCalls({
      caller: label,
      api: action,
      result_count: value,
    });

    apiCall.save();
  } catch (err) {
    logger.error(`error saving event - ${err.message}`);
  }
};

module.exports = { trackEvent };
