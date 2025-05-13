const asyncWrapper = require("../middlewares/asyncWrapper.js");
const Stadium = require("../models/Stadium");

const createStadium = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const { longitude, latitude } = req.body.location;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const stadium = await Stadium.create({
    name,
    location: { longitude, latitude },
  });

  return res.status(201).json(stadium);
});

const deleteStadium = asyncWrapper(async (req, res) => {
  const id = req.params.id;

  const stadium = await Stadium.deleteOne({ _id: id });
  if (!stadium) {
    return res.status(404).json({ message: "Stadium not found" });
  }
  return res.status(200).json({
    message: "stadium Deleted Successfully",
  });
});

const getStadiums = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = page >= 1 && (page - 1) * limit;
  const stadiums = await matchModel
    .find({}, { password: false, __v: false, token: false })
    .limit(limit)
    .skip(skip);
  return res.status(200).json({
    message: "success",
    data: stadiums,
    nextPage:
      stadiums.length > 0 && page > 0
        ? `https://localhost:5000/stadiums?limit=1&page=${
            page <= 1 ? 2 : parseInt(page) + 1
          }`
        : null,
    prevPage:
      stadiums.length > 0 && page > 0
        ? `https://localhost:5000/stadiums?limit=1&page=${
            page > 1 ? parseInt(page) - 1 : 1
          }`
        : null,
  });
});

module.exports = {
  createStadium,
  deleteStadium,
  getStadiums
};
