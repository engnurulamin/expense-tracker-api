const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const balanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    balance: {
      type: Number,
      required: [true, "Balance is required"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [255, "Max char can be 255"],
    },
  },
  {
    timestamps: true,
  }
);

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
