const express = require("express");

const { isLoggedOut, isLoggedIn } = require("../middleware/auth");
const { validateUserLogin } = require("../validators/auth");
const runValidation = require("../validators");
const { login } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", login);

module.exports = authRouter;
