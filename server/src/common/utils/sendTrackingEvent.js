const ua = require("universal-analytics");

const visitor = ua("UA-116850596-2");

const trackEvent = ({ category, action, label, value }) => {
  visitor.event(category, action, label, value).send();
};

module.exports = { trackEvent };
