const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true

    },
    commenter:{
        type: mongoose.SchemaTypes.ObjectId,
       ref: "User",
    },
})

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;