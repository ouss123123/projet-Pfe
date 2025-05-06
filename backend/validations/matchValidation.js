const { body } = require("express-validator");

const createGameValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("location").notEmpty().withMessage("Location is required"),

  body("date").notEmpty().withMessage("Date is required"),

  body("time").notEmpty().withMessage("Time is required"),

  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is required")
    .isMongoId()
    .withMessage("createdBy must be a valid MongoDB ObjectId"),

  body("players").notEmpty().withMessage("Players is required"),

  body("maxPlayers")
    .notEmpty()
    .withMessage("maxPlayers is required")
    .isInt({ min: 1 })
    .withMessage("maxPlayers must be a positive integer"),
];

module.exports = {
  createGameValidator,
};
