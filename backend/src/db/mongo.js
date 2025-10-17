const mongoose = require("mongoose");
const logger = require("../lib/logger");
const asyncHandler = require("../utils/asyncHandler");

const connectMongo = asyncHandler(async (uri) => {
  if (!uri) throw new Error("MONGO_URI undefined!");
  await mongoose.connect(uri);
  logger.info("✅ MongoDB Connected");
});

module.exports = { connectMongo };