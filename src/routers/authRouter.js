const express = require("express");
const { login } = require("../controllers/authController");
const { validateUserLogin } = require("../validator/auth");
const runValidation = require("../validator");

const authRouter = express.Router();

authRouter.post("/login", validateUserLogin, runValidation, login);

module.exports = authRouter;
