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
  const { lastCommentId, limit } = req.query;

  let query = null;

  !lastCommentId
    ? (query = { match: match })
    : (query = { _id: { $lte: lastCommentId }, match: match });

  const comments = await commentModel
    .find(query)
    .sort({ _id: -1 })
    .limit(+limit || 10)
    .populate("createdBy", "name profile_picture");

  return res.status(200).json({
    message: "Comments fetched successfully",
    data: comments,
  });
});

const deleteComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const comment = await commentModel.findByIdAndDelete(id);
  if (!comment) {
    return res.status(404).json({
      message: "Comment not found",
    });
  }
  return res.status(200).json({
    message: "comment deleted successfully",
    data: comment,
  });
});

const editComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const updatedComment = await commentModel.findByIdAndUpdate(
    id,
    { comment },
    { new: true }
  );
  return res.status(200).json({
    message: "comment updated successfully",
    data: updatedComment,
  });
});

module.exports = {
  createComment,
  getComments,
  deleteComment,
  editComment,
};
