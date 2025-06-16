const { body, query } = require("express-validator");

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
    .withMessage("createdBy is required"),

  body("maxPlayers")
    .notEmpty()
    .withMessage("maxPlayers is required")
    .isInt({ min: 1 })
    .withMessage("maxPlayers must be a positive integer"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0 })
    .withMessage("price must be a positive number"),
];

const searchGameValidator = [
];

const addPlayersValidator = [
  body("players").notEmpty().withMessage("players are required"),
];

const matchCanceledValidator = [
  body("isCanceled")
    .notEmpty()
    .withMessage("isCanceled is required")
    .isBoolean()
    .withMessage("isCanceled must be a boolean"),
];

const playerCanceledValidator = [
  body("playerId").notEmpty().withMessage("isPlaying is required"),
];

const getMatchesValidator = [
];

const filterMatchValidator = [
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in ISO 8601 format"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];

module.exports = {
  createGameValidator,
  searchGameValidator,
  addPlayersValidator,
  matchCanceledValidator,
  playerCanceledValidator,
  filterMatchValidator,
  getMatchesValidator,
};
