const { connectToMongo } = require("../mongodb");
const createMailer = require("../../common/mailer");
const scan = require("../../common/components/clamav");
const config = require("config");

module.exports = async (options = {}) => {
  return {
    db: options.db || (await connectToMongo()).db,
    mailer: options.mailer || createMailer({ smtp: { ...config.private.smtp, secure: false } }),
    scan,
  };
};
