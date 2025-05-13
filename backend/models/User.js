const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  profile_picture: { type: String, default: "../public/images/default.webp" },
  resetPasswordToken: { type: String, default: null },
  role: { type: String, enum: ["player", "admin"], default: "player" },
  token: {
    type: String,
  },
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    mvpCount: { type: Number, default: 0 },
    rating: {
      fairPlay: { type: Number, default: 0 },
      punctuality: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
