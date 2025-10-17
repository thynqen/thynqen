function validate(schema) {
  return async (req, res, next) => {
    try {
      await Promise.resolve(schema.parse({ body: req.body, params: req.params, query: req.query }));
      next();
    } catch (e) {
      return res.status(400).json({ error: "Doğrulama hatası", details: e.errors });
    }
  };
}
module.exports = validate;