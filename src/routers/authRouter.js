const express = require("express");
const { login, logout } = require("../controllers/authController");
const { validateUserLogin } = require("../validator/auth");
const runValidation = require("../validator");

const authRouter = express.Router();

authRouter.post("/login", validateUserLogin, runValidation, login);
authRouter.post("/logout", logout);

module.exports = authRouter;
