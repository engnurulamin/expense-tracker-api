const express = require("express");
const { seedUser, seedBalance } = require("../controllers/seedController");

const seedRouter = express.Router();

seedRouter.get("/users", seedUser);
seedRouter.get("/balance", seedBalance);

module.exports = seedRouter;
