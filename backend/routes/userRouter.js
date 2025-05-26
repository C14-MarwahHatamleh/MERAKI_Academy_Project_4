const express = require("express");
const userRouter = express.Router();
const authMiddlewares = require("../middleware/auth");
const authzMiddlewares = require("../middleware/authz");

const {
  createUser,
  loginUser,
  getAllUsers,
  LoggedUser,
  FindUserByID,
} = require("../controllers/usersControllers");

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get(
  "/",
  authMiddlewares,
  authzMiddlewares("GET-ALL-USERS"),
  getAllUsers
);
userRouter.get("/byId/:id/profile", FindUserByID);

module.exports = userRouter;
