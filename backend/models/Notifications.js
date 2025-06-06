const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: String,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
