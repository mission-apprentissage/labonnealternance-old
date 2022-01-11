const config = require("config");

module.exports = (req, res, next) => {
  const application = req.get("Application");
  const apiKey = req.get("API-Key");

  if (!apiKey) {
    res.status(401).json({ error: "Missing API Key" });
  } else {
    if ((application && apiKey !== config[application]?.apiKey) || (!application && apiKey !== config.apiKey)) {
      res.status(401).json({ error: "Unauthorized API Key" });
    } else {
      next();
    }
  }
};
