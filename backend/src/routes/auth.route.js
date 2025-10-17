const router = require("express").Router();
const validate = require("../middlewares/validate");
const { requireAuth } = require("../middlewares/auth");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const { authLimiter, register, login, me } = require("../controllers/auth.controller");

// Rate limit tüm auth rotalarında
router.use(authLimiter);

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", requireAuth, me);

module.exports = router;