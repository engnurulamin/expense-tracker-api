const express = require("express");
const { allexpenses } = require("../controllers/expenseController");

const expenseRouter = express.Router();

expenseRouter.get("/", allexpenses);

module.exports = expenseRouter;
