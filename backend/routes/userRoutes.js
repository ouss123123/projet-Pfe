const express = require("express");
const usersController = require("../controllers/UserController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.get("/users", verifyToken, usersController.getUsers); 
router.get("/users/:id", verifyToken, usersController.getUserById); 
router.post(
  "/users",
  usersController.SignUp
); 
router.post("/login", usersController.Login);

module.exports = router;