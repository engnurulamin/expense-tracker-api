const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
  UpdateUser,
  processRegister,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/process-register", processRegister);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", UpdateUser);

module.exports = userRouter;
