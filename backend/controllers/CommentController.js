const asyncWrapper = require("../middlewares/asyncWrapper.js");
const commentModel = require("../models/Comment.js");

const createComment = asyncWrapper(async (req, res) => {
  const { comment, match, createdBy } = req.body;
  const newComment = new commentModel({
    comment,
    match,
    createdBy,
  });
  await newComment.save();
  return res.status(201).json({
    message: "Comment created successfully",
    data: newComment,
  });
});

module.exports = {
  createComment,
};
