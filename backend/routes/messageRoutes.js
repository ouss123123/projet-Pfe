const express = require("express");
const MessageController = require("../controllers/MessageController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/get", verifyToken, MessageController.getMessages);
router.post("/send", verifyToken, MessageController.sendMessages);

module.exports = router;