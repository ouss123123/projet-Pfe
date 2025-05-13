const { body , param } = require("express-validator");

const createStadiumValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("location.longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isNumeric()
    .withMessage("Longitude must be a number"),
  body("location.latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isNumeric()
    .withMessage("Latitude must be a number"),
];

const deleteStadiumValidator = [
    param("id").isMongoId().withMessage("Invalid user ID"),
]

module.exports = {
  createStadiumValidator,
  deleteStadiumValidator
};
