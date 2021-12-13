const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { updateLaBonneBoite } = require("../../service/lbb/updateLaBonneBoite");
const { updateGeoLocations } = require("../../service/lbb/updateGeoLocations");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await updateLaBonneBoite(req.query);
      return res.json(result);
    })
  );

  router.get(
    "/updateGeoLocations",
    tryCatch(async (req, res) => {
      const result = await updateGeoLocations(req.query);
      return res.json(result);
    })
  );

  return router;
};
