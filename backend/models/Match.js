const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: {
      type: String,
      required: true
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    maxPlayers: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    players: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    isCanceled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
