const { ApiCalls } = require("../../common/model");

const trackEvent = async ({ action, label, value }) => {
  //visitor.event(category, action, label, value).send();

  let apiCall = new ApiCalls({
    caller: label,
    api: action,
    result_count: value,
  });

  apiCall.save();
};

module.exports = { trackEvent };
