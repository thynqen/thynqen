const { verifyToken } = require("../lib/jwt");

function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token gerekli" });

  try {
    const payload = verifyToken(token); // { sub, username, role, iat, exp }
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Geçersiz/expired token" });
  }
}

module.exports = { requireAuth };