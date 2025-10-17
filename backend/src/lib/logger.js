const pino = require("pino");
const pinoHttp = require("pino-http");

const logger = pino({
  transport: process.env.NODE_ENV !== "production" ? { target: "pino-pretty" } : undefined,
});

const httpLogger = pinoHttp({
  logger,
  customSuccessMessage: (res) => `✅ ${res.statusCode} ${res.statusMessage}`,
  customErrorMessage: (error, res) => `❌ ${res.statusCode} ${error.message}`,
  customReceivedMessage: (req, res) => `➡️  ${req.method} ${req.url}`,
  serializers: {
    req(req) {
      return { method: req.method, url: req.url };
    },
    res(res) {
      return { statusCode: res.statusCode };
    },
  },
});

module.exports = logger;
module.exports.httpLogger = httpLogger;