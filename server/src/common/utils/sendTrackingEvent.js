const ua = require("universal-analytics");
const config = require("config");

const visitor = ua(config.private.googleAnalyticsUA);

const trackEvent = ({ category, action, label, value }) => {
  visitor.event(category, action, label, value).send();
};

module.exports = { trackEvent };
