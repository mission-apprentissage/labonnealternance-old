const express = require("express");

/**
 * Simulate a dummy error
 */
module.exports = () => {
  const router = express.Router();

  router.get("/", function (req, res) {
    res.status(500).send({ error: "Something failed ! This is a simulated error." });
  });

  return router;
};
