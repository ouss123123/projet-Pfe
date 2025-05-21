const matchModel = require("../models/Match");
const asyncWrapper = require("../middlewares/asyncWrapper.js");
const userModel = require("../models/User.js");

const createMatch = asyncWrapper(async (req, res) => {
  const { title, location, date, time, players, createdBy, maxPlayers, Price } =
    req.body;
  const newMatch = new matchModel({
    title,
    location,
    date,
    time,
    players,
    createdBy,
    maxPlayers,
    Price,
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

  const updatedTeam = await match.save();

  res.json({
    message: "Players added and updated successfully",
    data: updatedTeam,
  });
});

const searchMatch = asyncWrapper(async (req, res) => {
  const { title, location } = req.query;
  const matches = await matchModel.find({
    title: { $regex: title, $options: "i" },
    location: { $regex: location, $options: "i" },
  });
  return res.status(200).json({
    message: "founded",
    data: matches,
  });
});

const getMatches = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = page >= 1 && (page - 1) * limit;
  const matches = await matchModel
    .find({}, { password: false, __v: false, token: false })
    .limit(limit)
    .skip(skip);
  return res.status(200).json({
    message: "success",
    data: matches,
    nextPage:
      matches.length > 0 && page > 0
        ? `https://localhost:5000/matches?limit=1&page=${
            page <= 1 ? 2 : parseInt(page) + 1
          }`
        : null,
    prevPage:
      matches.length > 0 && page > 0
        ? `https://localhost:5000/matches?limit=1&page=${
            page > 1 ? parseInt(page) - 1 : 1
          }`
        : null,
  });
});

const getMatchById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const match = await matchModel.findById(id);
  const user = await userModel.findById(match.createdBy);
  if (!match) {
    return res.status(404).json({ message: "Match not found" });
  }
  res.status(200).json({ message: "success", data: match, user: user });
});

const matchCanceled = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { isCanceled } = req.body;
  if (isCanceled === true) {
    await matchModel.findByIdAndDelete(id);
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
  return res.status(200).json({ message: "success" });
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
