const express = require("express");
const usersController = require("../controllers/UserController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const loginValidation = require("../validations/loginValidation.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.get("/", verifyToken, usersController.getUsers);
router.get("/:id", verifyToken, usersController.getUserById);
router.post("/", usersController.SignUp);
router.post("/login", loginValidation, validate, usersController.Login);
router.patch("/:id", usersController.updateProfile);
router.post("/forgotPassword", usersController.forgetPassword);
router.post("/resetPassword", usersController.resetPassword);

module.exports = router;
