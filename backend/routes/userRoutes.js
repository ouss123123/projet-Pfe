const express = require("express");
const usersController = require("../controllers/UserController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  loginValidation,
  registerValidation,
  paginationValidator,
  userByIdValidation,
  updateProfileValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require("../validations/usersValidation.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.get(
  "/",
  paginationValidator,
  validate,
  verifyToken,
  usersController.getUsers
);
router.get(
  "/:id",
  userByIdValidation,
  validate,
  verifyToken,
  usersController.getUserById
);
router.post("/", registerValidation, validate, usersController.SignUp);
router.post("/login", loginValidation, validate, usersController.Login);
router.patch(
  "/:id",
  updateProfileValidator,
  validate,
  usersController.updateProfile
);
router.post(
  "/forgotPassword",
  forgetPasswordValidator,
  validate,
  usersController.forgetPassword
);
router.post(
  "/resetPassword",
  resetPasswordValidator,
  validate,
  usersController.resetPassword
);

module.exports = router;
