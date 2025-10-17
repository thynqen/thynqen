const http = require("http");
const app = require("./app");
const env = require("./config/env");
const logger = require("./lib/logger");
const { connectMongo } = require("./db/mongo");

(async () => {
  try {
    await connectMongo(env.MONGO_URI);
    const server = http.createServer(app);
    server.listen(env.PORT, () => logger.info(`🚀 Server ${env.PORT} portunda çalışıyor`));
  } catch (err) {
    logger.error(err, "❌ Server başlatılamadı");
    process.exit(1);
  }
})();