const express = require("express");
const notificationController = require("../controllers/NotificationController");
const verifyToken = require("../middlewares/verifyToken");
const validate = require("../middlewares/validate");
const { createNotificationValidator } = require("../validations/notificationValidator");

const router = express.Router();

router.post("/",verifyToken,createNotificationValidator,validate, notificationController.createNotification);
router.get("/", notificationController.getNotifications);

module.exports = router;
