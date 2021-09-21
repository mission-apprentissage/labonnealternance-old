const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { sendTestMail } = require("../../service/sendMail");

/**
 * API romes
 */
module.exports = (components) => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await sendTestMail({ query: req.query, ...components });
      return res.json(result);
    })
  );

  return router;
};
