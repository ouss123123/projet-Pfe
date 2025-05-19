const express = require("express");
const matchController = require("../controllers/MatchController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  createGameValidator,
  searchGameValidator,
  addPlayersValidator,
} = require("../validations/matchValidation.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createGameValidator,
  validate,
  matchController.createMatch
);

router.get(
  "/search",
  verifyToken,
  searchGameValidator,
  validate,
  matchController.searchMatch
);

router.patch(
  "/:id",
  verifyToken,
  addPlayersValidator,
  validate,
  matchController.addPlayers
);

router.get("/", verifyToken, matchController.getMatches);

router.get("/:id", verifyToken, matchController.getMatchById);

module.exports = router;
