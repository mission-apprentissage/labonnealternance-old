const winston = require("winston");
const { combine, timestamp, printf } = winston.format;
const config = require("config");
const Sentry = require("winston-transport-sentry-node").default;

const createLogger = () => {
  const lbaFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
  });

  const sentryOptions = {
    sentry: {
      dsn: "https://ca61634412164c598d0c583198eaa62e@o154210.ingest.sentry.io/5417826",
    },
    level: "error",
  };

  const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), lbaFormat),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
      new Sentry(sentryOptions),
    ],
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (config.env === "local") {
    logger.add(new winston.transports.Console());
  }

  return logger;
};

module.exports = createLogger();
