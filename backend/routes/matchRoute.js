const express = require("express");
const matchController = require("../controllers/MatchController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  createGameValidator,
  searchGameValidator,
  addPlayersValidator,
  matchCanceledValidator,
  filterMatchValidator,
  getMatchesValidator,
  playerCanceledValidator,
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

router.delete(
  "/:id",
  verifyToken,
  matchCanceledValidator,
  validate,
  matchController.matchCanceled
);

router.delete(
  "/players/:id",
  verifyToken,
  playerCanceledValidator,
  validate,
  matchController.playerCanceled
);

router.get(
  "/",
  verifyToken,
  getMatchesValidator,
  validate,
  matchController.getMatches
);

router.get("/:id", verifyToken, matchController.getMatchById);

router.post(
  "/filter",
  verifyToken,
  filterMatchValidator,
  validate,
  matchController.filterMatches
);

module.exports = router;
