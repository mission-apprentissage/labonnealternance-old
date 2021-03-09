const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getRomesAndLabelsFromTitleQuery } = require("../../service/domainesMetiers");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/formation/{id}",
    tryCatch(async (req, res) => {
      const result = await getRomesAndLabelsFromTitleQuery(req.query);
      return res.json(result);
    })
  );

  router.get(
    "/offre/{id}",
    tryCatch(async (req, res) => {
      const result = await getRomesAndLabelsFromTitleQuery(req.query);
      return res.json(result);
    })
  );

  router.get(
    "/societe/:id",
    tryCatch(async (req, res) => {
      //  --> req.params.id
      const result = await getRomesAndLabelsFromTitleQuery(req.query);
      return res.json(result);
    })
  );

  return router;
};
