import jwt from "jsonwebtoken";
import { config } from "../config/env.provider.js";

/**
 * Sign a JWT access token
 * @param {Object} payload - Data to encode in the token
 * @param {string} [expiresIn] - Token expiration time (default from env)
 * @returns {string} - JWT token
 */
export const signAccessToken = (payload, expiresIn = config.JWT_ACCESS_EXPIRES) => {
  try {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn });
  } catch (err) {
    console.error("❌ Failed to sign access token:", err.message);
    throw new Error("Failed to generate access token");
  }
};

/**
 * Verify a JWT access token
 * @param {string} token - JWT token
 * @returns {Object} - Decoded payload
 * @throws {Error} - Throws if token is invalid or expired
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_ACCESS_SECRET);
  } catch (err) {
    console.error("❌ Invalid or expired token:", err.message);
    throw new Error("Invalid or expired access token");
  }
};
