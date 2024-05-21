const express = require("express");
const {
  allexpenses,
  getExpense,
  UpdateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const expenseRouter = express.Router();

expenseRouter.get("/", allexpenses);
expenseRouter.get("/:id", getExpense);
expenseRouter.put("/:id", UpdateExpense);
expenseRouter.delete("/:id", deleteExpense);

module.exports = expenseRouter;
