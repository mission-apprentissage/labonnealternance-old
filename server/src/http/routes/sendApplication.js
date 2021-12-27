const express = require("express");
const tryCatch = require("../middlewares/tryCatchMiddleware");
const {
  sendApplication,
  saveApplicationFeedback,
  saveApplicationFeedbackComment,
  saveApplicationIntention,
  saveApplicationIntentionComment,
} = require("../../service/applications");
const rateLimit = require("express-rate-limit");
const logger = require("../../common/logger");

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
      const result = await sendApplication({ shouldCheckSecret: true, query: req.query, ...components });

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
      const result = await sendApplication({
        shouldCheckSecret: req.body.secret ? true : false,
        query: req.body,
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
    tryCatch(async (req /*, res*/) => {
      logger.info(`Webhook post`);
      logger.info(JSON.stringify(req.body));
      /* Format req.body
        { 
          event : "unique_opened",
          id: 497470,
          date: "2021-12-27 14:12:54",
          ts: 1640610774,
          message-id: "<48ea8e31-715e-d929-58af-ca0c457d2654@apprentissage.beta.gouv.fr>",
          email:"alan.leruyet@free.fr",
          ts_event: 1640610774,
          subject: "Votre candidature chez PARIS BAGUETTE FRANCE CHATELET EN ABREGE",
          sending_ip: "93.23.252.236",
          ts_epoch: 1640610774707
        }*/

      return "ok";
    })
  );

  return router;
};
