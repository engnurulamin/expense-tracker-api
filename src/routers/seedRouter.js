const express = require("express");
const {
  seedUser,
  seedBalance,
  seedExpense,
} = require("../controllers/seedController");

const seedRouter = express.Router();

seedRouter.get("/users", seedUser);
seedRouter.get("/balance", seedBalance);
seedRouter.get("/expense", seedExpense);

module.exports = seedRouter;
