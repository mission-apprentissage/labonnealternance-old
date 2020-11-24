const ua = require("universal-analytics");

const visitor = ua("UA-116850596-1");

const sendTrackingEvent = ({ category, action, label, value }) => {
  visitor.event(category, action, label, value).send();
};

module.exports = { sendTrackingEvent };
