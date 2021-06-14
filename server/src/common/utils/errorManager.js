const Sentry = require("@sentry/node");
const { trackApiCall } = require("./sendTrackingEvent");

const manageApiError = ({ error, api, caller, errorTitle }) => {
  let errorObj = { result: "error", message: error.message };
  const status = error?.response?.status || "";
  error.name = `API error ${status ? status + " " : ""}${errorTitle}`;
  if (error?.config) {
    Sentry.setExtra("config", error?.config);
  }
  Sentry.captureException(error);

  if (caller) {
    trackApiCall({ caller, api, result: "Error", status });
  }

  if (error.response) {
    errorObj.status = error.response.status;
    errorObj.statusText = error.response.statusText;
  }

  console.log(`error ${errorTitle}`, errorObj);

  return errorObj;
};

module.exports = { manageApiError };
