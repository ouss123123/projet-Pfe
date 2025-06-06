const {body} = require("express-validator");

const createNotificationValidator = [
    body("message")
        .notEmpty()
        .withMessage("message is required")
        .isLength({ min: 3 })
        .withMessage("message must be at least 3 characters"),
]

module.exports = {
    createNotificationValidator
}