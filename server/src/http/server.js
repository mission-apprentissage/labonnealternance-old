const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const config = require("config");
const logger = require("../common/logger");
const bodyParser = require("body-parser");
//const logMiddleware = require("./middlewares/logMiddleware");
//const errorMiddleware = require("./middlewares/errorMiddleware");
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

module.exports = async (components) => {
  const { db } = components;
  const app = express();

  Sentry.init({
    dsn: "https://ca61634412164c598d0c583198eaa62e@o154210.ingest.sentry.io/5417826",
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

  app.use(bodyParser.json());
  app.use(corsMiddleware());
  //app.use(logMiddleware());

  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require('../api-docs/swagger.json');

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use("/api/formations", formation());
  app.use("/api/jobs", job());

  app.use("/api/v1/formations", formationV1());
  app.use("/api/v1/formationsParRegion", formationRegionV1());
  app.use("/api/v1/jobs", jobV1());
  app.use("/api/v1/jobsEtFormations", jobEtFormationV1());

  app.use("/api/jobsdiplomas", jobDiploma());
  app.use("/api/romelabels", rome());

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

  /*  app.use((err, req, res, next) => {
    //console.log("err : ",err,res.status());
    return res.json({error:"prout",message:err});
  });*/

  return app;
};
