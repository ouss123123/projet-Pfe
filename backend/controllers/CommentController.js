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

const getComments = asyncWrapper(async (req, res) => {
  const { match } = req.params;
  const matches = await commentModel.find({ match: match });
  return res.status(200).json({
    message : "Comments fetched successfully",
    data : matches
  })
});

module.exports = {
  createComment,
  getComments,
};
