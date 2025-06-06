const { body } = require("express-validator");

const createReportValidator = [
  body("reportedBy").isString().withMessage("reportedBy must be a string"),
  body("targetId").isString().withMessage("targetId must be a string"),
  body("reason").isString().withMessage("reason must be a string"),
];

module.exports = {
  createReportValidator,
};
