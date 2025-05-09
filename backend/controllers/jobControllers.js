const mongoose = require("mongoose");
const jobModel = require("../models/jobSchema");

const createNewJob = async (req, res) => {
  const token = req.token.userID;
  const {
    title,
    description,
    requirements,
    typeOfJob,
    hours,
    salary,
    locationWork,
    country,
    experience,
  } = req.body;
  const newJob = new jobModel({
    title,
    description,
    requirements,
    typeOfJob,
    hours,
    salary,
    locationWork,
    country,
    experience,
    user: token,
    comments: [],
  });
  newJob
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Job Created Successfully",
        jobs: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });

  //   const newArticle = new articleModel({
  //     title,
  //     description,
  //     author,
  //   });
  //   newArticle
  //     .save()
  //     .then((result) => {
  //       res.status(201).json({
  //         success: true,
  //         message: "Article created",
  //         result,
  //       });
  //     })
  //     .catch((err) => {
  //         res.status(500).json({
  //             success: false,
  //             message: "Server Error",
  //             err: err.message,
  //           });
  //     });
};

const getAllJobs = async (req, res) => {
  await jobModel
    .find({})
    .populate("comments")
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the jobs",
        jobs: result,
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

// const getJobByAuthor = async (req, res) => {
//   try {
//     console.log(req.query.authorId);
//     const { authorId } = req.query.authorId;
//     const foundArticle = await articleModel.findOne({ authorId }).exec();
//     if (foundArticle) {
//       res.status(200).json({
//         success: true,
//         message: `All the articles for the author: ${foundArticle.author}`,
//         articles: foundArticle,
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         message: `The author => ${authorId} has no articles`,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       err: error.message,
//     });
//   }
// };

const getJobByTitle = async (req, res) => {
  console.log(req.params.title);
  await jobModel
    .find({ title: req.params.title.toLowerCase() })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The Job ${result.title}`,
        jobs: result,
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

const getJobById = async (req, res) => {
  console.log(req.params.id);
  await jobModel
    .find({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The Job ${result.id}`,
        jobs: result,
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

const updateJobById = async (req, res) => {
  const { id } = req.params.id;
  const { title, description, requirements, typeOfJob, hours, locationWork } =
    req.body;
  console.log(req.params.id, req.body);
  await jobModel
    .findOneAndUpdate(id, {
      $set: {
        title: title,
        description: description,
        requirements: requirements,
        typeOfJob: typeOfJob,
        hours: hours,
        locationWork: locationWork,
      },
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Job Details Updated`,
        jobs: result,
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

const deleteJobById = async (req, res) => {
  const { id } = req.params.id;

  await jobModel
    .findOneAndDelete(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Job is deleted`,
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

const deleteJobByUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const findUser = await jobModel.findOneAndDelete(id).exec();

    if (findUser) {
      res.status(200).json({
        success: true,
        message: `Deleted Jobs for the user => ${findUser.id}`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Jobs for this User`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: error.message,
    });
  }
};

const getJobByFilter = async (req, res) => {
  const a = await jobModel
    .find({
      $or: [
        { title: req.params.criteria.toLowerCase() },
        { description: req.params.criteria.toLowerCase() },
        { typeOfJob: req.params.criteria.toLowerCase() },
        { locationWork: req.params.criteria.toLowerCase() },
      ],
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Get the jobs based on ${req.params.criteria}`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: `Can not find the jobs based on ${req.params.criteria}`,
      });
    });
  //    const a = await jobModel.find($or: [{ title: (req.params.title).toLowerCase() } ,{typeOfJob: (req.params.title).toLowerCase()}, {locationWork: (req.params.title).toLowerCase()}]).exec()
  //    console.log(a)
  // console.log(req.params.typeOfJob);
  // await jobModel
  //  .find({ typeOfJob: (req.params.typeOfJob).toLowerCase() })
  //  .then((result) => {
  //    res.status(200).json({
  //      success: true,
  //      message: `The Job ${result.typeOfJob}`,
  //      jobs: result,
  //    });
  //  })
  //  .catch((err) => {
  //    res.status(500).json({
  //      success: false,
  //      message: "Server Error",
  //      err: err.message,
  //    });
  //  });
};

// const createNewComment = (req , res)=>{
// const {articleId} = req.params.articleId

// articleModel.findOneAndUpdate(articleId )
// }

module.exports = {
  createNewJob,
  getAllJobs,
  getJobById,
  getJobByTitle,
  updateJobById,
  deleteJobById,
  deleteJobByUser,
  getJobByFilter,
};
