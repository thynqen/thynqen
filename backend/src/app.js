const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("./config/env");
const logger = require("./lib/logger");
const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, env: env.NODE_ENV });
});

app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.url });
  next();
});

app.use("/api/v1", routes);

module.exports = app;