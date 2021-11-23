const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
//const { updateLaBonneBoite } = require("../../service/lbb/updateLaBonneBoiteData");
const { updateRomeNaf } = require("../../service/lbb/updateRomeNaf");

/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  /*router.get(
    "/",
    tryCatch(async (req, res) => {
      const result = await updateLaBonneBoite(req.query);
      return res.json(result);
    })
  );*/

  router.get(
    "/updateRomeNaf",
    tryCatch(async (req, res) => {
      const result = await updateRomeNaf(req.query);
      return res.json(result);
    })
  );

  return router;
};
