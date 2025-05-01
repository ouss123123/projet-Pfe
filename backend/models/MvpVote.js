import mongoose from "mongoose";

const mvpVoteSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  votedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  votedFor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const MVP = mongoose.model("MVP", mvpVoteSchema);

module.exports = MVP;
