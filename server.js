// server.js
import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";
import { config } from "./config/env.provider.js";
import { connectDB } from "./config/db.js";

const PORT = config.PORT || 3000;

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${config.NODE_ENV} mode`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
})();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err);
  process.exit(1);
});
