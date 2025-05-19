const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
