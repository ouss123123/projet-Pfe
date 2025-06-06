const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reason: {type :String},
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
