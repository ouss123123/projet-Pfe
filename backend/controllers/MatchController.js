const matchModel = require("../models/Match");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const userModel = require("../models/User.js");
const stadiumModel = require("../models/Stadium");

const createMatch = asyncWrapper(async (req, res) => {
  const {
    title,
    location,
    date,
    time,
    players,
    createdBy,
    maxPlayers,
    Price,
    stadiumLocation,
  } = req.body;
  const newMatch = new matchModel({
    title,
    location,
    date,
    time,
    players,
    createdBy,
    maxPlayers,
    Price,
    stadiumLocation,
  });
  await newMatch.save();
  res.status(201).json({
    message: "match created successfully",
    data: newMatch,
  });
});

const addPlayers = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { players } = req.body;

  const match = await matchModel.findById(id);
  if (!match) return res.status(404).send("Team not found");

  players.forEach((incomingPlayer) => {
    const existingPlayer = match.players.find(
      (p) => p.user.toString() === incomingPlayer.user.toString()
    );

    if (existingPlayer) {
      existingPlayer.isPlaying = true;
    } else {
      match.players.push({
        user: incomingPlayer.user,
        isPlaying: true,
      });
    }
  });

  await match.save();
  const updatedMatch = await matchModel.findById(id).populate("players.user");
  res.json({
    message: "Players added and updated successfully",
    data: updatedMatch,
  });
});

const searchMatch = asyncWrapper(async (req, res) => {
  const { title, location } = req.query;
  const query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" };
  }
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }
  const matches = await matchModel.find(query);
  return res.status(200).json({
    message: "founded",
    data: matches,
  });
});

const getMatches = asyncWrapper(async (req, res) => {
  const matches = await matchModel
    .find({}, { password: false, __v: false, token: false })
  return res.status(200).json({
    message: "success",
    data: matches,
  });
});

const getMatchById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const match = await matchModel.findById(id).populate("players.user");
  const user = await userModel.findById(match.createdBy);
  const stadium = await stadiumModel.findOne({ name: match.location });
  if (!match) {
    return res.status(404).json({ message: "Match not found" });
  }
  return res.status(200).json({
    message: "success",
    data: match,
    user: user,
    stadium: stadium
      
  });
});

const matchCanceled = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { isCanceled } = req.body;
  if (isCanceled === true) {
    const data = await matchModel.findByIdAndDelete(id);
  }
  return res.status(200).json({ message: "success" });
});

const playerCanceled = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { playerId } = req.body;
  const match = await matchModel.findById(id);
  const playerIndex = match.players.findIndex(
    (player) => player.user == playerId
  );
  match.players.splice(playerIndex, 1);
  await match.save();
  return res.status(200).json({ message: "success", data: match });
});

const filterMatches = asyncWrapper(async (req, res) => {
  const { location, date } = req.body;
  const dateReq = new Date(date);
  const match = await matchModel.find({
    location: { $regex: location, $options: "i" },
    date: { $lte: new Date(dateReq) },
  });
  return res.status(200).json({ message: "success", data: match });
});

module.exports = {
  createMatch,
  getMatches,
  addPlayers,
  searchMatch,
  getMatchById,
  matchCanceled,
  playerCanceled,
  filterMatches,
};