const express = require("express");
const { createNewComment } = require("../controllers/commentControllers");
const authMiddlewares = require("../middleware/auth");
const authzMiddlewares = require("../middleware/authz");

const commentRouter = express.Router();

commentRouter.post(
  "/:jobId/comments/",
  authMiddlewares,
  authzMiddlewares("CREATE_COMMENTS"),
  createNewComment
);

// commentRouter.delete(
//     "/:jobId/comment/",
//     authMiddlewares,
//     authzMiddlewares("DELETE_COMMENTS"),
//     deleteComment
//   );
module.exports = commentRouter;
