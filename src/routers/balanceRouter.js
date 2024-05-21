const express = require("express");
const {
  allBalances,
  getBalance,
  UpdateBalance,
  deleteBalance,
  addBalance,
} = require("../controllers/balanceController");
const { isLoggedIn } = require("../helpers/utils");
const balanceRouter = express.Router();

balanceRouter.post("/add", isLoggedIn, addBalance);
balanceRouter.get("/", isLoggedIn, allBalances);
balanceRouter.get("/:id", isLoggedIn, getBalance);
balanceRouter.put("/:id", isLoggedIn, UpdateBalance);
balanceRouter.delete("/:id", isLoggedIn, deleteBalance);

module.exports = balanceRouter;
