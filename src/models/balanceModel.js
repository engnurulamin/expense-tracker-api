const { Schema, model } = require("mongoose");

const balanceSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [255, "Max char can be 25"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Balance = model("Balance", balanceSchema);

module.exports = Balance;
