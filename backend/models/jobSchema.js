const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  typeOfJob: {
    type: String,
    required: true,
  },
  hours: {
    type: String,
    required: true,
  },
  salary:{
    type: String,
  },
  locationWork: {
    type: String,
    required: true,
  },
  country:{
    type: String,
    required: true,
  },
  experience:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
  },
});

jobSchema.pre("save", async function () {
  this.title = this.title.toLowerCase();
  this.typeOfJob = this.typeOfJob.toLowerCase();
  this.locationWork = this.locationWork.toLowerCase();
});

const jobModel = mongoose.model("JobDetails", jobSchema);

module.exports = jobModel;
