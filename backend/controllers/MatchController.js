const matchModel = require("../models/Match");

const createMatch = async (req, res) => {
  try {
    const { title, location, date, time, players, createdBy } = req.body;
    console.log(req.body);

    const newMatch = new matchModel({
      title,
      location,
      date,
      time,
      players,
      createdBy,
    });
    await newMatch.save();
    res.status(201).json({
      message: "match created successfully",
      data: newMatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating match" });
  }
};

module.exports = {
  createMatch,
};
