const asyncWrapper = require("../middlewares/asyncWrapper");
const ReportModel = require("../models/Report");

const createReport = asyncWrapper(async (req, res) => {
  const { reason, targetId, reportedBy } = req.body;
  if(!reason || !targetId || !reportedBy) return res.status(400).json({message : "bad request"});
  const newReport = new ReportModel({
    reason,
    targetId,
    reportedBy,
  })
  await newReport.save();
  return res.status(201).json({
    message : "created report successfully",
    data : newReport
  })
});

const getReports = asyncWrapper(async (req, res) => {
  const reports = await ReportModel.find();
  return res.status(200).json({
    message: "reports fetched successfully",
    data: reports,
  });
});

module.exports = {
    createReport,
    getReports
}