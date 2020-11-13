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
const jobDiploma = require("./routes/jobDiploma");
const formation = require("./routes/formation");
const formationV1 = require("./routes/formationV1");
const formationRegionV1 = require("./routes/formationRegionV1");
const job = require("./routes/job");
const jobV1 = require("./routes/jobV1");
const jobEtFormationV1 = require("./routes/jobEtFormationV1");
const rateLimit = require("express-rate-limit");





const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandle = nextApp.getRequestHandler()







module.exports = async (components) => {
  const { db } = components;
  const expressServer = express();

  Sentry.init({
    dsn: "https://ca61634412164c598d0c583198eaa62e@o154210.ingest.sentry.io/5417826",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ expressServer }),
    ],
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  expressServer.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  expressServer.use(Sentry.Handlers.tracingHandler());

  expressServer.use(bodyParser.json());
  expressServer.use(corsMiddleware());
  //expressServer.use(logMiddleware());

  const limiter3PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 3, // limit each IP to 3 requests per windowMs
  });
  const limiter5PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // limit each IP to 5 requests per windowMs
  });
  const limiter10PerSecond = rateLimit({
    windowMs: 1000, // 1 second
    max: 10, // limit each IP to 10 requests per windowMs
  });

  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require('../api-docs/swagger.json');

  expressServer.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  expressServer.use("/api/formations", limiter5PerSecond, formation());

  expressServer.use("/api/jobs", limiter3PerSecond, job());

  expressServer.use("/api/v1/formations", limiter5PerSecond, formationV1());

  expressServer.use("/api/v1/formationsParRegion", limiter5PerSecond, formationRegionV1());

  expressServer.use("/api/v1/jobs", limiter3PerSecond, jobV1());

  expressServer.use("/api/v1/jobsEtFormations", limiter3PerSecond, jobEtFormationV1());

  expressServer.use("/api/jobsdiplomas", limiter10PerSecond, jobDiploma());

  expressServer.use("/api/romelabels", limiter10PerSecond, rome());

  expressServer.get(
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

  expressServer.get(
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

  return expressServer;
};
