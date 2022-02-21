const config = require("config");
const { isOriginLocal } = require("./isOriginLocal");

const allowedSources = config.private.allowedSources;

const isAllowedSource = ({ referer, caller }) => {
  return isOriginLocal(referer) || isAllowedClearEmail({ caller });
};

const isAllowedClearEmail = ({ caller }) => {
  return allowedSources.split("|").indexOf(caller) >= 0;
};

module.exports = { isAllowedSource, isAllowedClearEmail };
