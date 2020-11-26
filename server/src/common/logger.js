const winston = require("winston");
require("winston-daily-rotate-file");
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
      new winston.transports.DailyRotateFile({
        filename: "lbaserver-error-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        dirname: config.env === "local" ? "./logs/" : "/data/logs",
        maxFiles: "14d",
        level: "error",
      }),
      new winston.transports.DailyRotateFile({
        filename: "lbaserver-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        dirname: config.env === "local" ? "./logs/" : "/data/logs",
        maxFiles: "14d",
        level: "info",
      }),
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
