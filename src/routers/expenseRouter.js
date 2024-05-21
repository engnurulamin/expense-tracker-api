const express = require("express");
const {
  allexpenses,
  getExpense,
  UpdateExpense,
  deleteExpense,
  addExpense,
} = require("../controllers/expenseController");
const { isLoggedIn } = require("../helpers/utils");

const expenseRouter = express.Router();

expenseRouter.get("/", isLoggedIn, allexpenses);
expenseRouter.post("/add", isLoggedIn, addExpense);
expenseRouter.get("/:id", isLoggedIn, getExpense);
expenseRouter.put("/:id", isLoggedIn, UpdateExpense);
expenseRouter.delete("/:id", isLoggedIn, deleteExpense);

module.exports = expenseRouter;
