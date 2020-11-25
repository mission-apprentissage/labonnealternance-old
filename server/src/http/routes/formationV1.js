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

  return router;
};
