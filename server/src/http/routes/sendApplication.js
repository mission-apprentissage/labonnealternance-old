const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const { sendApplication } = require("../../service/applications");
const rateLimit = require("express-rate-limit");

const limiter1Per20Second = rateLimit({
  windowMs: 20000, // 20 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

/**
 * API romes
 */
module.exports = (components) => {
  const router = express.Router();
  console.log(components);
  router.get(
    "/",
    limiter1Per20Second,
    tryCatch(async (req, res) => {
      // const result = await sendApplication({ shouldCheckSecret: true, query: req.query, ...components });
      return res.json({ fakeOk: "ok" });
    })
  );

  router.post(
    "/",
    limiter1Per20Second,
    tryCatch(async (req, res) => {
      // const result = await sendApplication({
      //   shouldCheckSecret: req.body.secret ? true : false,
      //   query: req.body,
      //   ...components,
      // });
      return res.json({ fakeOk: "ok" });
    })
  );

  return router;
};
