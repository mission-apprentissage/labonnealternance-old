const nodemailer = require("nodemailer");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const mjml = require("mjml");
const { promisify } = require("util");
const ejs = require("ejs");
const renderFile = promisify(ejs.renderFile);

/**
 * @description Create transporter.
 * @param {Object} smtp
 * @param {String} smtp.host
 * @param {String} smtp.port
 * @param {Object} smtp.auth
 * @param {String} smtp.user
 * @param {String} smtp.pass
 * @returns {Mail}
 */
const createTransporter = (smtp) => {
  const transporter = nodemailer.createTransport(smtp);

  transporter.use("compile", htmlToText({ ignoreImage: true }));

  return transporter;
};

module.exports = (config, transporter = createTransporter(config.smtp)) => {
  const renderEmail = async (template, data = {}) => {
    const buffer = await renderFile(template, { data });
    const { html } = mjml(buffer.toString(), { minify: true });

    return html;
  };

  return {
    renderEmail,
    sendEmail: async (to, subject, template, data, attachments = null) => {
      return transporter.sendMail({
        from: "no-reply@apprentissage.beta.gouv.fr",
        to,
        subject,
        html: await renderEmail(template, data),
        list: {},
        attachments,
      });
    },
    sendPlainTextEmail: async (to, subject) => {
      return transporter.sendMail({
        from: "no-reply@apprentissage.beta.gouv.fr",
        to,
        subject,
        body: `Mail pour ${to}`,
        list: {},
      });
    },
  };
};
