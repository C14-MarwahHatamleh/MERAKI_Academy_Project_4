const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },
 requirements:{
    type:String,
    required:true
 },
 typeOfJob:{
    type:String,
    required:true
 },
 hours:{
    type:String,
    required:true
 },
 locationWork:{
    type:String,
    required:true
 },
 author: {
   type: mongoose.Schema.ObjectId,
   ref: "User",
 },
 comments: {
   type:[mongoose.Schema.Types.ObjectId] ,
   ref: "Comment",
 },
});

const jobModel = mongoose.model("JobDetails", jobSchema);

module.exports = jobModel;
