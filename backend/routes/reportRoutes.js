const express = require("express");
const reportController = require("../controllers/ReportController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { createReportValidator } = require("../validations/reportValidator.js");
const validate = require("../middlewares/validate.js");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  createReportValidator,
  validate,
  reportController.createReport
);
router.get("/", verifyToken, reportController.getReports);

module.exports = router;
