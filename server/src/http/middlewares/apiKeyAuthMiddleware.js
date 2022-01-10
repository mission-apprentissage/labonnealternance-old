const config = require("config");

module.exports = (req, res, next) => {
  const application = req.get("Application");
  const apiKey = req.get("API-Key");

  const key = config[application].apiKey;

  if (!apiKey || key) {
    res.status(401).json({ error: "Unauthorized API Key" });
  } else {
    next();
  }
};
