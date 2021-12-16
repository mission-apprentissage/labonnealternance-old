const logger = require("../logger");
const logMessage = (level, msg) => {
  //console.log(msg);
  if (level === "info") {
    logger.info(msg);
  } else {
    logger.error(msg);
  }
};

module.exports = { logMessage };
