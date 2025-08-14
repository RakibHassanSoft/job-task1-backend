import { ApiError } from "../utils/ApiError.js";

/**
 * Validate request with a Joi schema
 * @param {Joi.Schema} schema
 * @param {string} [where='body'] - body, query, or params
 */
export const joiValidate =
  (schema, where = "body") =>
  (req, _res, next) => {
    const { error, value } = schema.validate(req[where], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((d) => ({
        path: d.path.join("."),
        message: d.message,
      }));
      return next(new ApiError(422, "Validation failed", errors));
    }
    req[where] = value; // sanitized
    next();
  };
