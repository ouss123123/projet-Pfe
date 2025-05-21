const { body, param } = require("express-validator");

const getMessagesValidator = [
  body("userIds").isArray().withMessage("userIds must be an array"),
];
const sendMessagesValidator = [
  body("sender").isString().withMessage("Sender must be a string"),
  body("receiver").isString().withMessage("Receiver must be a string"),
  body("message").isString().withMessage("Message must be a string"),
];

module.exports = {
  getMessagesValidator,
  sendMessagesValidator,
};
