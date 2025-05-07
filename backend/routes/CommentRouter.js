const express = require("express");
const {
  createNewComment,
  deleteComment,
  updateComment,
} = require("../controllers/commentControllers");
const authMiddlewares = require("../middleware/auth");
const authzMiddlewares = require("../middleware/authz");

const commentRouter = express.Router();

commentRouter.post(
  "/:jobId/comments/",
  authMiddlewares,
  authzMiddlewares("CREATE_COMMENTS"),
  createNewComment
);

commentRouter.delete(
  "/deleteComment/:jobId/:commentId/comment",
  authMiddlewares,
  authzMiddlewares("DELETE_COMMENTS"),
  deleteComment
);

commentRouter.put(
  "/updateComment/:jobId/:commentId/comment",
  authMiddlewares,
  authzMiddlewares("UPDATE_COMMENTS"),
  updateComment
);

module.exports = commentRouter;
