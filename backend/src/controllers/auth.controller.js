const rateLimit = require("express-rate-limit");
const User = require("../models/user.model");
const { signToken } = require("../lib/jwt");
const asyncHandler = require("../utils/asyncHandler");

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const exists = await User.findOne({ $or: [{ username }, { email }] }).lean();
  if (exists) return res.status(409).json({ error: "Kullanıcı adı veya e-posta kullanımda" });
  const user = await User.create({ username, email, password, role });
  res.status(201).json({ user: user.toSafeJSON() });
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return res.status(401).json({ error: "Geçersiz bilgiler" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ error: "Geçersiz bilgiler" });
  const token = signToken({ sub: user._id.toString(), username: user.username, role: user.role });
  res.json({ token, user: user.toSafeJSON() });
});

const me = asyncHandler(async (req, res) => {
  const me = await User.findById(req.user.sub).lean();
  if (!me) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
  res.json({ user: { id: me._id.toString(), username: me.username, email: me.email, role: me.role } });
});

module.exports = { authLimiter, register, login, me };