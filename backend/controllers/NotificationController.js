const asyncWrapper = require("../middlewares/asyncWrapper.js");
const notificationModel = require("../models/Notifications.js");

const createNotification = asyncWrapper(async (req, res) => {
    const { message } = req.body;
    if(!message) return res.status(400).json({message : "bad request"});
    const newNotification = new notificationModel({
        message,
    });
    await newNotification.save();
    return res.status(201).json({
        message: "notification created successfully",
        data: newNotification,
    });
});

const getNotifications = asyncWrapper(async (req, res) => {
    const notifications = await notificationModel.find();
    return res.status(200).json({
        message: "notifications fetched successfully",
        data: notifications,
    });
});

module.exports = {
    createNotification,
    getNotifications
}