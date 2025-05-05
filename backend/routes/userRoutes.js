const express = require("express");
const usersController = require("../controllers/UserController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.get("/", verifyToken, usersController.getUsers); 
router.get("/:id", verifyToken, usersController.getUserById); 
router.post(
  "/",
  usersController.SignUp
); 
router.post("/login", usersController.Login);
router.patch("/:id",usersController.updateProfile)

module.exports = router;