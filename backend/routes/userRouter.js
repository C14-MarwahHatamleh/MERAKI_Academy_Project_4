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
  DeleteUserById,
  FindEmailUser,
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
userRouter.delete(
  "/:id/deleteUser",
  authMiddlewares,
  authzMiddlewares("DELETE-USERS"),
  DeleteUserById
);

userRouter.get("/byEmail/:email", FindEmailUser);



module.exports = userRouter;
