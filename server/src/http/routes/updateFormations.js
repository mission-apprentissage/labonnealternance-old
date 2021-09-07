const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { updateFormationsQuery } = require("../../service/updateFormations");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await updateFormationsQuery(req.query);
      return res.json(result);
    })
  );

  return router;
};
