import Joi from "joi";

export const expenseSchemaCreate = Joi.object({
  title: Joi.string().trim().min(3).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  amount: Joi.number().greater(0).required().messages({
    "number.base": "Amount must be a number",
    "number.greater": "Amount must be greater than 0",
    "any.required": "Amount is required",
  }),
  category: Joi.string()
    .valid("Food", "Transport", "Shopping", "Others")
    .optional()
    .messages({
      "any.only": "Category must be one of: Food, Transport, Shopping, Others",
    }),
  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
});
export const expenseSchemaUpdate = Joi.object({
  title: Joi.string().trim().min(3).optional().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
  }),
  amount: Joi.number().greater(0).optional().messages({
    "number.base": "Amount must be a number",
    "number.greater": "Amount must be greater than 0",
    "any.required": "Amount is required",
  }),
  category: Joi.string().optional()
    .valid("Food", "Transport", "Shopping", "Others")
    .optional()
    .messages({
      "any.only": "Category must be one of: Food, Transport, Shopping, Others",
    }),
  date: Joi.date().optional().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
});
