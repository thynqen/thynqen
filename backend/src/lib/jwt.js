const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET || "dev_secret_change_me", {
    expiresIn: process.env.ACCESS_TOKEN_TTL || "1h",
  });
}
function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET || "dev_secret_change_me");
}

module.exports = { signToken, verifyToken };