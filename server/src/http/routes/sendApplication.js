const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const {
  getApplications,
  sendApplication,
  saveApplicationFeedback,
  saveApplicationFeedbackComment,
  saveApplicationIntention,
  saveApplicationIntentionComment,
  updateApplicationStatus,
  debugUpdateApplicationStatus,
  updateBlockedEmails,
} = require("../../service/applications");
const rateLimit = require("express-rate-limit");
const apiKeyAuthMiddleware = require("../middlewares/apiKeyAuthMiddleware");

const limiter1Per5Second = rateLimit({
  windowMs: 5000, // 5 seconds
  max: 1, // limit each IP to 1 request per windowMs
});

module.exports = (components) => {
  const router = express.Router();

  router.post(
    "/",
    limiter1Per5Second,
    tryCatch(async (req, res) => {
      const result = await sendApplication({
        shouldCheckSecret: req.body.secret ? true : false,
        query: req.body,
        referer: req.headers.referer,
        ...components,
      });

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
    limiter1Per5Second,
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
    limiter1Per5Second,
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

  router.get(
    "/updateBlockedEmails",
    tryCatch(async (req, res) => {
      updateBlockedEmails({ shouldCheckSecret: true, query: req.query, ...components });
      return res.json({ result: "ok" });
    })
  );

  router.get(
    "/search",
    apiKeyAuthMiddleware,
    tryCatch(async (req, res) => {
      if (!req.query) {
        return res.status(400).json({ error: true, message: "No query provided." });
      }

      let results = await getApplications(req.query);
      return res.json(results);
    })
  );

  return router;
};
