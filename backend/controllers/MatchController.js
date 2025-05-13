const matchModel = require("../models/Match");
const asyncWrapper = require("../middlewares/asyncWrapper.js");

const createMatch = asyncWrapper(async (req, res) => {
  const { title, location, date, time, players, createdBy, maxPlayers } =
    req.body;
  const newMatch = new matchModel({
    title,
    location,
    date,
    time,
    players,
    createdBy,
    maxPlayers,
  });
  await newMatch.save();
  res.status(201).json({
    message: "match created successfully",
    data: newMatch,
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

module.exports = {
  createMatch,
  getMatches,
};
