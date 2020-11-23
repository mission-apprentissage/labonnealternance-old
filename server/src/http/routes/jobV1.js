const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const peApi = require("../../service/poleEmploi/jobsAndCompanies");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await peApi.getJobsQuery({ ...req.query, origin: req.headers.origin });

      if (result.error) {
        if (result.error === "wrong_parameters") res.status(400);
        else res.status(500);
      }

      return res.json({ ...result, origin: req.headers.origin });
    })
  );

  return router;
};
