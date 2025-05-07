const express = require("express");
const userRouter = express.Router();

const {
  createUser,
  loginUser,
  getAllUsers,
  LoggedUser,
} = require("../controllers/usersControllers");

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
