const messageModel = require("../models/Message.js");
const asyncWrapper = require("../middlewares/asyncWrapper.js");

const getMessages = asyncWrapper(async (req, res) => {
  const userIds = req.body.userIds;

  if (!userIds || userIds.length < 2) {
    return res.status(400).json({ message: "Invalid or missing userIds" });
  }

  const messages = await messageModel.find({
    $or: [
      { sender: userIds[0], receiver: userIds[1] },
      { sender: userIds[1], receiver: userIds[0] },
    ],
  });

  res.status(200).json(messages);
});

const sendMessages = asyncWrapper(async (req, res) => {
  const { sender, receiver, message } = req.body;

  const newMessage = new messageModel({
    sender,
    receiver,
    message,
  });

  await newMessage.save();
  res.status(201).json(newMessage);
});

module.exports = {
  getMessages,
  sendMessages,
};
