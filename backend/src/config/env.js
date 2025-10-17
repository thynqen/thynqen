require("dotenv").config();

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/thynqen",
  JWT_SECRET: process.env.JWT_SECRET || "fallback_secret_key_change_me",
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || "1h",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};

module.exports = env;