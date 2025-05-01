const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['player', 'admin'], default: 'player' },
  profileImage: String,
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    mvpCount: { type: Number, default: 0 },
    rating: {
      fairPlay: { type: Number, default: 0 },
      punctuality: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 }
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;