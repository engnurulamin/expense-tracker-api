const express = require("express");
const {
  allBalances,
  getBalance,
  UpdateBalance,
  deleteBalance,
  addBalance,
} = require("../controllers/balanceController");
const balanceRouter = express.Router();

balanceRouter.post("/add", addBalance);
balanceRouter.get("/", allBalances);
balanceRouter.get("/:id", getBalance);
balanceRouter.put("/:id", UpdateBalance);
balanceRouter.delete("/:id", deleteBalance);

module.exports = balanceRouter;
