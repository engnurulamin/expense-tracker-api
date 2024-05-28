const express = require("express");
const {
  login,
  logout,
  refreshToken,
  handleProtected,
} = require("../controllers/authController");
const { validateUserLogin } = require("../validator/auth");
const runValidation = require("../validator");
const { isLoggedOut, isLoggedIn } = require("../helpers/utils");

const authRouter = express.Router();

authRouter.post("/login", validateUserLogin, runValidation, isLoggedOut, login);
authRouter.post("/logout", isLoggedIn, logout);
authRouter.get("/refresh-token", refreshToken);
authRouter.get("/protected", handleProtected);

module.exports = authRouter;
