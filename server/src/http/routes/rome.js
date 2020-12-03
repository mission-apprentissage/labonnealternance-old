const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getRomesAndLabelsFromTitleQuery } = require("../../service/domainesMetiers");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await getRomesAndLabelsFromTitleQuery(req.query);
      return res.json(result);
    })
  );

  return router;
};
