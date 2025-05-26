const mongoose = require("mongoose");
const ApplyModel = require("../models/applySchema");
const jobModel = require("../models/jobSchema");

const applyJob = async (req, res) => {
  const token = req.token.userID;
  const {
    firstName,
    lastName,
    Email,
    title,
    Phone,
    Education,
    salary,
    country,
    yearsOfExperiences,
    currentJob,
    cvURL,
  } = req.body;
  const newApply = new ApplyModel({
    firstName,
    lastName,
    Email,
    title,
    Phone,
    Education,
    salary,
    country,
    yearsOfExperiences,
    currentJob,
    cvURL,
    user: token,
  });
  newApply
    .save()
    .then(async (resultApplications) => {
      await jobModel
        .findOneAndUpdate(
          { _id: req.params.jobId },
          {
            $push: {
              applications: resultApplications._id,
            },
          }
        )
        .then((result) => {
          res.status(201).json({
            success: true,
            message: `the application have been submitted successfully`,
            applications: resultApplications,
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

const GetAllApplyJobs = async (req, res) => {
  ApplyModel.find({})
    .populate("user")
    .then((results) => {
      res.status(200).json({
        success: false,
        message: `Get All applications`,
        applications: results,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: err.message,
      });
    });
};

const GetApplyJobsById = async (req, res) => {
  await ApplyModel.find({ user: req.params.id }).populate("user")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The Applications are getting for ${req.params.id}`,
        UserApplications: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         success: true,
//         message: "the application have been submitted successfully",
//         jobs: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: "Server Error",
//         err: err.message,
//       });
//     });
// };

module.exports = {
  applyJob,
  GetAllApplyJobs,
  GetApplyJobsById,
};
