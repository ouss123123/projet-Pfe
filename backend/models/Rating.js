import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
  ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratedFor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fairPlay: Number,
  punctuality: Number,
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
