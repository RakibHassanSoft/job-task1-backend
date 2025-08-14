/**
 * Custom API Error for consistent error handling
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {Object} [details] - Optional extra error details
   */
  constructor(statusCode, message, details = null) {
    super(message);

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    // distinguishes expected errors vs system errors
    this.isOperational = true; 
  }

  /**
   * Convert error to JSON (for API responses)
   */
  toJSON() {
    return {
      status: this.statusCode,
      message: this.message,
      ...(this.details && { details: this.details }),
    };
  }
}
