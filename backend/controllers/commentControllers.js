const mongoose = require("mongoose");
const commentModel = require("../models/commentSchema");
const jobModel = require("../models/jobSchema");

const createNewComment = (req, res) => {
  const token = req.token.userID;  
  const { comment } = req.body;
  const newComment = new commentModel({
    comment,
    commenter :token,
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



module.exports = {
  createNewComment,
};
