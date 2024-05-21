const express = require("express");
const { allBalances, getBalance } = require("../controllers/balanceController");
const balanceRouter = express.Router();

balanceRouter.get("/", allBalances);
balanceRouter.get("/:id", getBalance);

module.exports = balanceRouter;
