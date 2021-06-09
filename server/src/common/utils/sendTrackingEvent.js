const { ApiCalls } = require("../../common/model");

const trackApiCall = async ({ caller, api, nb_formations, nb_emplois, result_count, result }) => {
  try {
    let apiCall = new ApiCalls({
      caller,
      api,
      nb_formations,
      nb_emplois,
      result_count,
      result,
    });

    apiCall.save();
  } catch (err) {
    console.log("Error tracking api call.", err);
  }
};

module.exports = { trackApiCall };
