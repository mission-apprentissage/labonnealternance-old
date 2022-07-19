const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const peApi = require("../../service/poleEmploi/jobsAndCompanies");
const matchaApi = require("../../service/matcha");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await peApi.getJobsQuery({ ...req.query, referer: req.headers.referer });

      if (result.error) {
        if (result.error === "wrong_parameters") res.status(400);
        else res.status(500);
      }

      return res.json(result);
    })
  );

  router.get(
    "/job/:id",
    tryCatch(async (req, res) => {
      const result = await peApi.getPeJobQuery({
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
    "/matcha/:id",
    tryCatch(async (req, res) => {
      const result = await matchaApi.getMatchaJobById({
        id: req.params.id,
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
    "/company/:siret",
    tryCatch(async (req, res) => {
      const result = await peApi.getCompanyQuery({
        siret: req.params.siret,
        type: req.query.type,
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

  return router;
};
