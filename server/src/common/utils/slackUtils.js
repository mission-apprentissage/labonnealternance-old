const config = require("config");
const axios = require("axios");

const notifyToSlack = async (message) => {
  await axios.post(config.private.jobSlackWebhook, {
    text: `[LBA - ${config.env.toUpperCase()}] ${message}`,
  });
};

module.exports = {
  notifyToSlack,
};
