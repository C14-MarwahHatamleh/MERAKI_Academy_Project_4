const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  Phone: {
    type: String,
    required: true,
    trim: true,
  },
  Education: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  yearsOfExperiences: {
    type: String,
    required: true,
    trim: true,
  },
  currentJob: {
    type: String,
    trim: true,
  },
  cvURL: {
    type: String,
    required: true,
  },
  applyDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

ApplySchema.pre("save", async function () {
  this.currentJob = this.currentJob.toLowerCase().trim();
  this.Email = this.Email.toLowerCase().trim();
  this.country = this.country.toLowerCase().trim();
});

const ApplyModel = mongoose.model("ApplyJob", ApplySchema);

module.exports = ApplyModel;
