const mongoose = require("mongoose")

mongoose
  .connect("mongodb://localhost:27017/JobSearchApp")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error while connecting to DB", err);
  });