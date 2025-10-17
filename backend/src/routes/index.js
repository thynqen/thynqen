

const router = require("express").Router();

// Auth routes
router.use("/auth", require("./auth.route"));

// Eklenebilecek diğer route grupları (ileride):
// router.use("/items", require("./items.route"));
// router.use("/keys", require("./keys.route"));
// router.use("/int", require("./items.int.route"));

module.exports = router;