import mongoose from "mongoose";

/**
 * Expense Schema
 * Represents a single expense for a user
 */
const expenseSchema = new mongoose.Schema(
  {
    // Reference to the user who owns this expense
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },

    // Title of the expense
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      trim: true,
    },

    // Amount spent
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    // Category of the expense
    category: {
      type: String,
      enum: {
        values: ["Food", "Transport", "Shopping", "Others"],
        message: "Category must be one of Food, Transport, Shopping, Others",
      },
      default: "Others",
    },

    // Date of the expense
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value) => !isNaN(Date.parse(value)),
        message: "Invalid date format",
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Expense Model
 */
export const Expense = mongoose.model("Expense", expenseSchema);
