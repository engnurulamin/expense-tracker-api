const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  UpdateUser,
  createUser,
} = require("../controllers/userController");
const { validateUserRegistration } = require("../validator/auth");
const runValidation = require("../validator");
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateUserRegistration,
  runValidation,
  createUser
);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", UpdateUser);

module.exports = userRouter;
