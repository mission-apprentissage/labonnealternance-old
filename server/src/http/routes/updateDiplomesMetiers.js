const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { updateDiplomesMetiersQuery } = require("../../service/diplomesMetiers");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await updateDiplomesMetiersQuery(req.query);
      return res.json(result);
    })
  );

  return router;
};
