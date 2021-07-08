const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const config = require("config");
const logger = require("../common/logger");
const bodyParser = require("body-parser");
const tryCatch = require("./middlewares/tryCatchMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");
const packageJson = require("../../package.json");
const rome = require("./routes/rome");
const updateRomesMetiers = require("./routes/updateRomesMetiers");
const updateDiplomesMetiers = require("./routes/updateDiplomesMetiers");
const metiers = require("./routes/metiers");
const jobDiploma = require("./routes/jobDiploma");
const formationV1 = require("./routes/formationV1");
const version = require("./routes/version");
const error500 = require("./routes/error500");
const formationRegionV1 = require("./routes/formationRegionV1");
const jobV1 = require("./routes/jobV1");
const jobEtFormationV1 = require("./routes/jobEtFormationV1");
const rateLimit = require("express-rate-limit");
var path = require("path");

module.exports = async (components) => {
  const { db } = components;
  const app = express();

  Sentry.init({
    dsn: config.private.serverSentryDsn,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  app.use(bodyParser.json({ limit: "50mb" }));
  // Parse the ndjson as text for ES proxy
  app.use(bodyParser.text({ type: "application/x-ndjson" }));
  app.use(corsMiddleware());

  const limiter3PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 3, // limit each IP to 3 requests per windowMs
  });

  const limiter1Per5Second = rateLimit({
    windowMs: 5000, // 5 seconds
    max: 1, // limit each IP to 1 request per windowMs
  });

  const limiter5PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // limit each IP to 5 requests per windowMs
  });
  const limiter10PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 10, // limit each IP to 10 requests per windowMs
  });

  const limiter20PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 20, // limit each IP to 20 requests per windowMs
  });

  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("../api-docs/swagger.json");

  app.get("/api-docs/swagger.json", (req, res) => {
    res.sendFile(path.resolve("./src/api-docs/swagger.json"));
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use("/api/version", limiter3PerSecond, version());

  app.use("/api/error500", limiter3PerSecond, error500());

  app.use("/api/v1/formations", limiter5PerSecond, formationV1());

  app.use("/api/v1/formationsParRegion", limiter5PerSecond, formationRegionV1());

  app.use("/api/v1/jobs", limiter3PerSecond, jobV1());

  app.use("/api/v1/jobsEtFormations", limiter3PerSecond, jobEtFormationV1());

  app.use("/api/jobsdiplomas", limiter10PerSecond, jobDiploma());

  app.use("/api/romelabels", limiter10PerSecond, rome());

  app.use("/api/updateRomesMetiers", limiter1Per5Second, updateRomesMetiers());

  app.use("/api/updateDiplomesMetiers", limiter1Per5Second, updateDiplomesMetiers());

  app.use("/api/metiers", limiter20PerSecond, metiers());

  app.get(
    "/api",
    tryCatch(async (req, res) => {
      let mongodbStatus;
      await db
        .collection("sampleEntity")
        .stats()
        .then(() => {
          mongodbStatus = true;
        })
        .catch((e) => {
          mongodbStatus = false;
          logger.error("Healthcheck failed", e);
        });

      return res.json({
        name: `Serveur MNA - ${config.appName}`,
        version: packageJson.version,
        env: config.env,
        healthcheck: {
          mongodb: mongodbStatus,
        },
      });
    })
  );

  app.get(
    "/api/config",
    tryCatch(async (req, res) => {
      return res.json({
        config: {
          ...config,
          private: "",
        },
      });
    })
  );

  return app;
};
