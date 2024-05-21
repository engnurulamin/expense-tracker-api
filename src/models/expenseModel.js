const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    expense: {
      type: Number,
      required: [true, "Expense is required"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [255, "Max char can be 25"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
