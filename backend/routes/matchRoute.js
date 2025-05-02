const express = require("express");
const matchController = require("../controllers/MatchController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/", verifyToken, matchController.createMatch); 

module.exports = router;