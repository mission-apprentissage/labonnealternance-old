const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { sendApplication } = require("../../service/applications");

/**
 * API romes
 */
module.exports = (components) => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await sendApplication({ shouldCheckSecret: true, query: req.query, ...components });
      return res.json(result);
    })
  );

  router.post(
    "/",
    tryCatch(async (req, res) => {
      const result = await sendApplication({ shouldCheckSecret: false, query: req.body, ...components });
      return res.json(result);
    })
  );

  return router;
};
