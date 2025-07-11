const mongoose = require("mongoose");
const jobModel = require("../models/jobSchema");

const createNewJob = async (req, res) => {
  const token = req.token.userID;
  const {
    title,
    company,
    description,
    responsibilities,
    qualifications,
    skills,
    benefits,
    typeOfJob,
    workingHours,
    salary,
    locationWork,
    country,
    experience,
    status,
  } = req.body;
  const newJob = new jobModel({
    title,
    company,
    description,
    responsibilities,
    qualifications,
    skills,
    benefits,
    typeOfJob,
    workingHours,
    salary,
    locationWork,
    country,
    experience,
    status,
    user: token,
    comments: [],
    applications: [],
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
  const page = req.query.page;
  const limit = req.query.limit;

  await jobModel
    .find({ status: "Active" })
    .populate("applications")
    .populate("comments")
    .sort({ postingDate: "descending" })
    .skip(page * limit)
    .limit(limit)
    .lean()
    // /.skip((page - 1) * limit)
    //.limit(limit)
    .then((result) => {
      res.status(200).json({
        limit: limit,
        page: page,
        success: true,
        message: "All the jobs",
        totalJobs: result.length,
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

const getAllJobsWithoutFilter = async (req, res) => {
  await jobModel
    .find()
    .populate("applications")
    .populate("comments")
    .sort({ postingDate: "descending" })
    .lean()
    // /.skip((page - 1) * limit)
    //.limit(limit)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the jobs",
        totalJobs: result.length,
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

// red from marwa
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

const getJobBySearch = async (req, res) => {
  console.log(req.query.page);
  const page = req.query.page - 1;
  const limit = req.query.limit;
  console.log(req);
  await jobModel
    .find({
      $or: [
        { title: req.query.search },
        { description: { $regex: req.query.search, $options: "i" } },
        { skills: { $in: [req.query.search] } },
      ],
    })
    .sort({ postingDate: "descending" })
    .skip(page * limit)
    .limit(limit)
    .lean()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `The Jobs that based on Search input`,
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
  const {
    title,
    company,
    description,
    responsibilities,
    qualifications,
    skills,
    benefits,
    typeOfJob,
    workingHours,
    salary,
    locationWork,
    country,
    experience,
    status,
  } = req.body;
  await jobModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: title,
          company: company,
          description: description,
          responsibilities: responsibilities,
          qualifications: qualifications,
          skills: skills,
          benefits: benefits,
          typeOfJob: typeOfJob,
          workingHours: workingHours,
          salary: salary,
          locationWork: locationWork,
          country: country,
          experience: experience,
          status: status,
        },
      }
    )
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
  console.log(req.params.id);
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
  const page = req.query.page || 1;
  const limit = req.query.limit || 100;

  console.log(req.params.criteria.toLowerCase());
  await jobModel
    .find({
      $or: [
        { typeOfJob: req.params.criteria.toLowerCase() },
        { locationWork: req.params.criteria.toLowerCase() },
        // { salary: {
        //   "$and": [
        //     { "$gte": [ "$$salary.min",  req.params.criteria] },
        //     { "$lte": [ "$$salary.max", req.params.criteria] }
        //   ]}
        //    },
        { country: req.params.criteria.toLowerCase() },
      ],
    })
    .skip(page * limit)
    .limit(limit)
    .lean()
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

const getJobBySalary = async (req, res) => {
  await jobModel
    .find({
      $and: [
        { "salary.min": { $gte: req.params.min } },
        { "salary.max": { $lte: req.params.max } },
      ],
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Get the jobs based on Salary`,
        result: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: `Can not find the jobs based on Salary`,
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
  getJobBySearch,
  updateJobById,
  deleteJobById,
  deleteJobByUser,
  getJobByFilter,
  getJobBySalary,
  getAllJobsWithoutFilter,
};
