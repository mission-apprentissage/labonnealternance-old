const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");

const path = require('path');
const parseChangelog = require('changelog-parser')
const _ = require('lodash')

/**
 * VERSION
 */
module.exports = () => {
  const router = express.Router();

  router.get(
    "/",
    tryCatch(async (req, res) => {
      let data = await parseChangelog(path.join(__dirname, '../../../CHANGELOG.md'))
      return res.json(_.get(data, 'versions.0', {}));
    })
  );

  return router;
};
