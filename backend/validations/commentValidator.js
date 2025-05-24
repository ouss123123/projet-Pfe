const { param, body, query } = require("express-validator");

const createCommentValidator = [
  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is required")
    .isMongoId()
    .withMessage("createdBy must be a valid mongoDb Object ID"),
  body("match")
    .notEmpty()
    .withMessage("createdBy is required")
    .isMongoId()
    .withMessage("createdBy must be a valid mongoDb Object ID"),
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("comment must be a string"),
];

const getCommentsValidator = [
  query("limit").notEmpty().withMessage("limit is necessary"),
];

const deleteCommentValidator = [
  param("id")
    .isMongoId()
    .withMessage("id must be a valid Mongo Object ID"),
];

const editCommentValidator = [
  param("id")
    .isMongoId()
    .withMessage("id must be a valid Mongo Object ID"),
  body("comment")
    .notEmpty()
    .withMessage("comment is required")
    .isString()
    .withMessage("comment must be a string"),
];

module.exports = {
  createCommentValidator,
  getCommentsValidator,
  deleteCommentValidator,
  editCommentValidator,
};
