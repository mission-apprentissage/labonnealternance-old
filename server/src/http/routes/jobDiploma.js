const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getDiplomasForJobsQuery } = require("../../service/jobDiploma");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await getDiplomasForJobsQuery(req.query);

      if (result === "romes_missing") res.status(400);
      else if (result.error) res.status(500);

      return res.json(result);
    })
  );

  return router;
};
