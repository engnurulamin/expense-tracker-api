const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  UpdateUser,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", UpdateUser);

module.exports = userRouter;
