const express = require("express");
const {
  allBalances,
  getBalance,
  UpdateBalance,
  deleteBalance,
} = require("../controllers/balanceController");
const balanceRouter = express.Router();

balanceRouter.get("/", allBalances);
balanceRouter.get("/:id", getBalance);
balanceRouter.put("/:id", UpdateBalance);
balanceRouter.delete("/:id", deleteBalance);

module.exports = balanceRouter;
