const express = require("express");
const {
  allexpenses,
  getExpense,
  UpdateExpense,
  deleteExpense,
  addExpense,
} = require("../controllers/expenseController");

const expenseRouter = express.Router();

expenseRouter.get("/", allexpenses);
expenseRouter.post("/add", addExpense);
expenseRouter.get("/:id", getExpense);
expenseRouter.put("/:id", UpdateExpense);
expenseRouter.delete("/:id", deleteExpense);

module.exports = expenseRouter;
