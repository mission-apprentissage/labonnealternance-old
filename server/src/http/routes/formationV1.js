const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const formationApi = require("../../service/formations");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await formationApi.getFormationsQuery({ ...req.query, referer: req.headers.referer });

      if (result.error) {
        if (result.error === "wrong_parameters") res.status(400);
        else res.status(500);
      }

      return res.json(result);
    })
  );

  router.get(
    "/formation/:id",
    tryCatch(async (req, res) => {
      const result = await formationApi.getFormationQuery({
        id: req.params.id,
        referer: req.headers.referer,
        caller: req.query.caller,
      });

      if (result.error) {
        if (result.error === "wrong_parameters") {
          res.status(400);
        } else if (result.error === "not_found") {
          res.status(404);
        } else {
          res.status(500);
        }
      }

      return res.json(result);
    })
  );

  router.get(
    "/formationDescription/:id",
    tryCatch(async (req, res) => {
      const result = await formationApi.getFormationDescriptionQuery({
        id: req.params.id,
        referer: req.headers.referer,
      });

      if (result.error) {
        if (result.error === "wrong_parameters") {
          res.status(400);
        } else if (result.error === "not_found") {
          res.status(404);
        } else {
          res.status(500);
        }
      }

      return res.json(result);
    })
  );

  return router;
};
