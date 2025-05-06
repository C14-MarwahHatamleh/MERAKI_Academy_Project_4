const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

const favModel = mongoose.model("Fav", favSchema);

module.exports = favModel;
