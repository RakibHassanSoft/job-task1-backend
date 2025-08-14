import { responseHandler } from "../../utils/responseHandler.js";
import { expanceService } from "./index.js";

/**
 * Create new expense
 */
export const create = async (req, res, next) => {
  try {
    const expense = await expanceService.createExpense(req.user._id, req.body);
    responseHandler(res, expense, "Expense created successfully");
  } catch (err) {
    next(err);
  }
};

/**
 * Get all expenses
 */
export const getAll = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    const expenses = await expanceService.getAllExpenses(req.user._id, filters);
    responseHandler(res, expenses, "Expenses fetched successfully");
  
  
  } catch (err) {
    next(err);
  }
};

/**
 * Update expense by ID
 */
export const update = async (req, res, next) => {
  try {
    const expense = await expanceService.updateExpense(
      req.user._id,
      req.params.id,
      req.body
    );
    responseHandler(res, expense, "Expense updated successfully");
 
  } catch (err) {
    next(err);
  }
};

/**
 * Delete expense by ID
 */
export const remove = async (req, res, next) => {
  try {
    const expense = await expanceService.deleteExpense(
      req.user._id,
      req.params.id
    );
    responseHandler(res, expense, "Expense deleted successfully");
  } catch (err) {
    next(err);
  }
};
