const asyncWrapper = require("../middlewares/asyncWrapper.js");
const MvpVote = require("../models/MvpVote");

const createVoting = asyncWrapper(async (req, res) => {
  const { match, votedBy, votedFor } = req.body;
  if(!match || !votedBy || !votedFor) return res.status(400).json({message : "bad request"});
  const newVote = new MvpVote({
    match,
    votedBy,
    votedFor,
  });
  await newVote.save();
  return res.status(201).json({
    message: "vote created successfully",
    data: newVote,
  });
});

const getVotes = asyncWrapper(async (req, res) => {
  const votes = await MvpVote.find();
  return res.status(200).json({
    message: "votes fetched successfully",
    data: votes,
  });
});

module.exports = {
  createVoting,
  getVotes
};
