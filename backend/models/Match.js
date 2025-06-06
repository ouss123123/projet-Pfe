const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, },
    location: {
      type: String,
    },
    date: { type: Date },
    time: { type: String },
    maxPlayers: { type: Number },
    price: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    players: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isPlaying : {type: Boolean, default: false },
      },
    ],
    isCanceled: { type: Boolean, default: false },
    stadiumLocation: {
      lat: { type: Number },
      lng: { type: Number }
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
