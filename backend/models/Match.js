import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    title: String,
    location: {
      name: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    date: Date,
    time: String,
    maxPlayers: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    players: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        confirmed: { type: Boolean, default: false },
      },
    ],
    waitingList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isCanceled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
