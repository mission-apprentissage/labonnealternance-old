const { ApiCalls } = require("../../common/model");

const trackApiCall = async ({ caller, api, result_count, result }) => {
  try {
    let apiCall = new ApiCalls({
      caller,
      api,
      result_count,
      result,
    });

    apiCall.save();
  } catch (err) {
    console.log("Error tracking api call.", err);
  }
};

module.exports = { trackApiCall };
