const express = require("express");
const { login, logout } = require("../controllers/authController");
const { validateUserLogin } = require("../validator/auth");
const runValidation = require("../validator");
const { isLoggedOut, isLoggedIn } = require("../helpers/utils");

const authRouter = express.Router();

authRouter.post("/login", validateUserLogin, runValidation, isLoggedOut, login);
authRouter.post("/logout", isLoggedIn, logout);

module.exports = authRouter;
