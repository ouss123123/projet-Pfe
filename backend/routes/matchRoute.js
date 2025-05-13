const express = require("express");
const matchController = require("../controllers/MatchController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { createGameValidator } = require("../validations/matchValidation.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createGameValidator,
  validate,
  matchController.createMatch
);

router.get("/", verifyToken, matchController.getMatches);

module.exports = router;
