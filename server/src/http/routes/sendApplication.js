const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const {
  sendApplication,
  saveApplicationFeedback,
  saveApplicationFeedbackComment,
  saveApplicationIntention,
  saveApplicationIntentionComment,
  updateApplicationStatus,
  debugUpdateApplicationStatus,
} = require("../../service/applications");
const rateLimit = require("express-rate-limit");

const limiter1Per20Second = rateLimit({
  windowMs: 20000, // 20 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

const limiter1Per5Second = rateLimit({
  windowMs: 5000, // 5 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

/**
 * API romes
 */
module.exports = (components) => {
  const router = express.Router();

  router.get(
    "/",
    limiter1Per20Second,
    tryCatch(async (req, res) => {
      // const result = await sendApplication({ shouldCheckSecret: true, query: req.query, ...components });
      console.log("reached------------------------");
      const result = {};
      if (result.error) {
        if (result.error === "error_sending_application") {
          res.status(500);
        } else {
          res.status(400);
        }
      }
      return res.json(result);
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
      console.log("reached2------------------------");
      const result = {};
      if (result.error) {
        if (result.error === "error_sending_application") {
          res.status(500);
        } else {
          res.status(400);
        }
      }

      return res.json(result);
    })
  );

  router.post(
    "/feedback",
    limiter1Per5Second,
    tryCatch(async (req, res) => {
      const result = await saveApplicationFeedback({
        query: req.body,
        ...components,
      });
      return res.json(result);
    })
  );

  router.post(
    "/feedbackComment",
    limiter1Per20Second,
    tryCatch(async (req, res) => {
      const result = await saveApplicationFeedbackComment({
        query: req.body,
        ...components,
      });
      return res.json(result);
    })
  );

  router.post(
    "/intention",
    limiter1Per5Second,
    tryCatch(async (req, res) => {
      const result = await saveApplicationIntention({
        query: req.body,
        ...components,
      });
      return res.json(result);
    })
  );

  router.post(
    "/intentionComment",
    limiter1Per20Second,
    tryCatch(async (req, res) => {
      const result = await saveApplicationIntentionComment({
        query: req.body,
        ...components,
      });
      return res.json(result);
    })
  );

  router.post(
    "/webhook",
    tryCatch(async (req, res) => {
      updateApplicationStatus({ payload: req.body, ...components });
      return res.json({ result: "ok" });
    })
  );

  router.get(
    "/webhook",
    tryCatch(async (req, res) => {
      debugUpdateApplicationStatus({ shouldCheckSecret: true, query: req.query, ...components });
      return res.json({ result: "ok" });
    })
  );

  return router;
};
