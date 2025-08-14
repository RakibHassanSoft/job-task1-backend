import { Expense } from "./index.js";
import createHttpError from "http-errors";

/**
 * Create a new expense
 */
export const createExpense = async (userId, data) => {
  const expense = await Expense.create({ user: userId, ...data });
  return expense;
};

/**
 * Get all expenses of a user
 */
export const getAllExpenses = async (userId, filters = {}) => {
  const query = { user: userId };
 console.log(query);
  // Filter by category if provided
  if (filters.category) {
    query.category = filters.category;
  }

  // Filter by date range if provided
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) {
      query.date.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      query.date.$lte = new Date(filters.endDate);
    }
  }

  const expenses = await Expense.find(query).sort({ date: -1 });
  return expenses;
};


/**
 * Update an expense by ID
 */
export const updateExpense = async (userId, expenseId, data) => {
  if (!data || Object.keys(data).length === 0) {
    throw createHttpError(400, "No data provided for update");
  }

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: expenseId, user: userId },
     // ensures partial updates only modify provided fields
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    throw createHttpError(404, "Expense not found");
  }

  return updatedExpense;
};

/**
 * Delete an expense by ID
 */
export const deleteExpense = async (userId, expenseId) => {
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    user: userId,
  });
  if (!expense) throw createHttpError(404, "Expense not found");
  return expense;
};
