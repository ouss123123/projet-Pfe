const express = require("express");
const matchController = require("../controllers/MatchController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { createGameValidator } = require("../validations/matchValidation.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createGameValidator,
  validate,
  matchController.createMatch
);

module.exports = router;
