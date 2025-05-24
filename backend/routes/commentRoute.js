const express = require("express");
const commentController = require("../controllers/CommentController.js");
const validate = require("../middlewares/validate.js");
const {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
  editCommentValidator,
} = require("../validations/commentValidator.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createCommentValidator,
  validate,
  commentController.createComment
);
router.get(
  "/:match",
  verifyToken,
  getCommentsValidator,
  validate,
  commentController.getComments
);
router.delete(
  "/:id",
  verifyToken,
  deleteCommentValidator,
  validate,
  commentController.deleteComment
);

router.patch("/:id", verifyToken,editCommentValidator,validate, commentController.editComment);

module.exports = router;
