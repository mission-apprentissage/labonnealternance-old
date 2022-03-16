const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { updateLaBonneBoite } = require("../../service/lbb/updateLaBonneBoite");
const { updateGeoLocations } = require("../../service/lbb/updateGeoLocations");
const { updateOpcos } = require("../../service/lbb/updateOpcos");
const { updateContactInfo } = require("../../service/lbb/updateContactInfo");

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

  router.get(
    "/updateOpcos",
    tryCatch(async (req, res) => {
      const result = await updateOpcos(req.query);
      return res.json(result);
    })
  );

  router.get(
    "/updateContactInfo",
    tryCatch(async (req, res) => {
      const result = await updateContactInfo(req.query);
      return res.json(result);
    })
  );

  return router;
};
