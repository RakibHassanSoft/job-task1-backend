  import Joi from "joi";

  export const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters long",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email address",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
  });

  export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email address",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
  });
