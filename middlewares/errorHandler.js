import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handling Middleware
 *
 * This middleware catches and processes all errors thrown in the application,
 * including:
 *   - Custom ApiError instances
 *   - Joi validation errors
 *   - Mongoose validation and casting errors
 *   - Duplicate key errors
 *   - Network/system-level errors
 *
 * NOTE: This must be the **last** middleware registered in your Express app
 *       to ensure it can catch errors from all preceding routes/middlewares.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {Request} req - The incoming Express request object.
 * @param {Response} res - The Express response object.
 * @param {Function} _next - The next middleware function (unused here).
 */
export const errorHandler = (err, req, res, _next) => {
  // Log error for debugging purposes (can be replaced with a logging service)
  console.error(err);

  // Default error structure
  let statusCode = err.statusCode || 500; // Default to "Internal Server Error"
  let message = err.message || "Internal Server Error";
  let details = err.details || null;

  /**
   * 1. Handle Joi Validation Errors
   *    Joi attaches an `isJoi` property to its errors.
   *    This block formats Joi's `details` array into a cleaner, API-friendly structure.
   */
  if (err.isJoi) {
    statusCode = 422; // Unprocessable Entity
    message = "Validation failed";
    details = err.details.map(d => ({
      path: d.path.join("."),
      message: d.message
    }));
  }

  /**
   * 2. Handle Mongoose CastError
   *    Occurs when a value cannot be cast to the expected MongoDB type
   *    (e.g., invalid ObjectId format in URL params).
   */
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400; // Bad Request
    message = `Invalid ${err.path}: ${err.value}`;
  }

  /**
   * 3. Handle Mongoose ValidationError
   *    Occurs when Mongoose schema validation fails (e.g., required fields missing).
   */
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 422; // Unprocessable Entity
    message = "Validation failed";
    details = Object.values(err.errors).map(e => ({
      path: e.path,
      message: e.message
    }));
  }

  /**
   * 4. Handle Mongoose Duplicate Key Error
   *    Triggered when inserting a document with a unique index value
   *    that already exists in the collection.
   */
  if (err.code && err.code === 11000) {
    statusCode = 409; // Conflict
    const fields = Object.keys(err.keyValue);
    message = `Duplicate value for field(s): ${fields.join(", ")}`;
    details = err.keyValue;
  }

  /**
   * 5. Handle Network/System Errors
   *    Example: DNS lookup failure when calling an external service.
   */
  if (err.type === "system" && err.code === "ENOTFOUND") {
    statusCode = 503; // Service Unavailable
    message = "Network error — cannot reach the server";
  }

  /**
   * 6. Mark unexpected errors as non-operational
   *    Operational errors are expected and handled gracefully (e.g., validation errors),
   *    whereas programming/system errors are unexpected and may need investigation.
   */
  if (!(err instanceof ApiError)) {
    err.isOperational = false;
  }

  /**
   * 7. Send standardized JSON error response
   *    The structure is consistent for all error types, making it easier for
   *    clients to consume.
   */
  res.status(statusCode).json({
    status: statusCode,
    message,
    ...(details && { details })
  });
};
