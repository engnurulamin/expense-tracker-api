const express = require("express");
const { allexpenses, getExpense } = require("../controllers/expenseController");

const expenseRouter = express.Router();

expenseRouter.get("/", allexpenses);
expenseRouter.get("/:id", getExpense);

module.exports = expenseRouter;
