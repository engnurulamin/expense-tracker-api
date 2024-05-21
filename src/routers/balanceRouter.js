const express = require("express");
const { allBalances } = require("../controllers/balanceController");
const balanceRouter = express.Router();

balanceRouter.get("/", allBalances);

module.exports = balanceRouter;
