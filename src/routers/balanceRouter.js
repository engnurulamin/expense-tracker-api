const express = require("express");
const {
  allBalances,
  getBalance,
  UpdateBalance,
} = require("../controllers/balanceController");
const balanceRouter = express.Router();

balanceRouter.get("/", allBalances);
balanceRouter.get("/:id", getBalance);
balanceRouter.put("/:id", UpdateBalance);

module.exports = balanceRouter;
