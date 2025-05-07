const mongoose = require("mongoose");
const commentModel = require("../models/commentSchema");
const jobModel = require("../models/jobSchema");

const createNewComment = (req, res) => {
  const token = req.token.userID;
  const { comment } = req.body;
  const newComment = new commentModel({
    comment,
    commenter: token,
  });
  newComment
    .save()
    .then(async (resultComment) => {
      await jobModel
        .findOneAndUpdate(
          { _id: req.params.jobId },
          {
            $push: {
              comments: resultComment._id,
            },
          }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: `Comment Created`,
            comment: resultComment,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteComment = (req, res) => {
  jobModel
    .findOne({ _id: req.params.jobId })
    .then(async (result) => {
      const deleteCommentArr = result.comments.filter((ele, i) => {
        return ele != req.params.commentId;
      });
      await jobModel
        .findOneAndUpdate(
          { _id: req.params.jobId },
          {
            $set: {
              comments: deleteCommentArr,
            },
          }
        )
        .exec();
      commentModel.findOneAndDelete({ _id: req.params.commentId }).exec();
      res.status(200).json({
        success: true,
        message: "The comment has been deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: `can not find the comment ${err.message}`,
      });
    });
};

const updateComment = (req, res) => {
  const { comment } = req.body;
  commentModel
    .findOneAndUpdate(
      { _id: req.params.commentId },
      {
        $set: {
          comment: comment,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "the comment has been updated",
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "the comment not found",
      });
    });

  // jobModel
  //   .findOne({ _id: req.params.jobId })
  //   .then(async (result) => {
  //     const deleteCommentArr = result.comments.filter((ele, i) => {
  //       return ele != req.params.commentId;
  //     });
  //     await jobModel
  //       .findOneAndUpdate(
  //         { _id: req.params.jobId },
  //         {
  //           $set: {
  //             comments: deleteCommentArr,
  //           },
  //         }
  //       )
  //       .exec();
  //     commentModel.findOneAndDelete({ _id: req.params.commentId }).exec();
  //     res.status(200).json({
  //       success: true,
  //       message: "The comment has been deleted",
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(400).json({
  //       success: false,
  //       message: `can not find the comment ${err.message}`,
  //     });
  //   });
};

module.exports = {
  createNewComment,
  deleteComment,
  updateComment,
};
