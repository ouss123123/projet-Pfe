const { body, query, param } = require("express-validator");

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .notEmpty()
    .withMessage("Password is required"),
];

const registerValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long")
    .notEmpty()
    .withMessage("Password is required"),
  body("name").notEmpty().withMessage("First name is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
];

const userByIdValidation = [
  param("id").isMongoId().withMessage("invalid MongoDB ObjectId"),
];

const paginationValidator = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100")
    .toInt(),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than or equal to 1")
    .toInt(),
];

const updateProfileValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),

  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("email required"),

  body("phone").notEmpty().withMessage("phone required"),
];

const forgetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Email Wrong"),
];

const resetPasswordValidator = [
  body("resetPasswordToken")
    .notEmpty()
    .withMessage("Reset password token is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required"),
];

module.exports = {
  loginValidation,
  registerValidation,
  paginationValidator,
  userByIdValidation,
  updateProfileValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
};
