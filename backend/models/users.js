const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  profile_picture: String,
  role: {
    type: String || null,
    default: "user",
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", users);

module.exports = User;