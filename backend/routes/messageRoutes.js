const express = require("express");
const MessageController = require("../controllers/MessageController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const validate = require("../middlewares/validate.js");
const {
  getMessagesValidator,
  sendMessagesValidator,
} = require("../validations/messageValidator.js");

const router = express.Router();

router.post(
  "/get",
  verifyToken,
  getMessagesValidator,
  validate,
  MessageController.getMessages
);
router.post(
  "/send",
  verifyToken,
  sendMessagesValidator,
  validate,
  MessageController.sendMessages
);

module.exports = router;
