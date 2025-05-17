const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    companySize: {
      type: String,
      trim: true,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    companyType: {
      type: String,
      trim: true,
      enum: ["Public", "Private", "Government", "Non-Profit"],
    },
    companyLogo: {
      type: String,
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  responsibilities: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  qualifications: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  skills: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  benefits: [
    {
      type: String,
      trim: true,
    },
  ],
  typeOfJob: {
    type: String,
    required: true,
    trim: true,
    enum: {
      values: [
        "Full-time",
        "Part-time",
        "Contract",
        "Temporary",
        "Internship",
        "Freelance",
      ],
      message: "Status is required.",
    },
  },
  workingHours: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    min: {
      type: Number,
      trim: true,
      default: 290,
    },
    max: {
      type: Number,
      trim: true,
      default: 10000,
    },
  },
  locationWork: {
    type: String,
    required: true,
    trim: true,
    enum: ["Remote", "On-site", "Hybrid"],
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    minYears: {
      type: Number,
      trim: true,
      default: 0,
    },
    maxYears: {
      type: Number,
      trim: true,
      default: Infinity,
    },
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Closed"],
    default: "Active",
  },
  postingDate: {
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
  applications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ApplyJob",
  },
});

jobSchema.pre("save", async function () {
  this.title = this.title.toLowerCase().trim();
  this.typeOfJob = this.typeOfJob.toLowerCase().trim();
  this.locationWork = this.locationWork.toLowerCase().trim();
  this.country = this.country.toLowerCase().trim();
});

const jobModel = mongoose.model("JobDetails", jobSchema);

module.exports = jobModel;
