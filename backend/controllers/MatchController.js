const matchModel = require("../models/Match");
const asyncWrapper = require("../middlewares/asyncWrapper.js");

const createMatch = asyncWrapper(async (req, res) => {
  const { title, location, date, time, players, createdBy , maxPlayers } = req.body;
  const newMatch = new matchModel({
    title,
    location,
    date,
    time,
    players,
    createdBy,
    maxPlayers
  });
  await newMatch.save();
  res.status(201).json({
    message: "match created successfully",
    data: newMatch,
  });
});

module.exports = {
  createMatch,
};
