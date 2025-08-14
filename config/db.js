// db/connect.js
import mongoose from "mongoose";
import { config } from "./env.provider.js";

export const connectDB = async () => {
  if (!config.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in .env");
  }

  try {
    await mongoose.connect(config.MONGODB_URI, {
      autoIndex: config.NODE_ENV === "development", // enable only for dev
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // process.exit(1); // Stop server if DB connection fails
  }
};

