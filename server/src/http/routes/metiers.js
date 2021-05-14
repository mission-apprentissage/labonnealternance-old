const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { getMetiersPourCfd, getMetiersPourEtablissement } = require("../../service/domainesMetiers");
/**
 * API romes
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/metiersParFormation/:cfd",
    tryCatch(async (req, res) => {
      const result = await getMetiersPourCfd({ cfd: req.params.cfd });
      return res.json(result);
    })
  );

  router.get(
    "/metiersParEtablissement/:siret",
    tryCatch(async (req, res) => {
      const result = await getMetiersPourEtablissement({ siret: req.params.siret });
      return res.json(result);
    })
  );

  return router;
};
