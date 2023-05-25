const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const CriminalDictionary = require('../models/CriminalDictionary');





// @decs Add Criminal Dictionary
// @route POST /api/v1/criminalDictionary
// @ptotect Protected/Admin/Manager
exports.addCriminalDictionary = asyncHandler(async (req, res) => {
  const criminalDictionary = await CriminalDictionary.create(req.body);
  criminalDictionary.videos = undefined;
  res.status(StatusCodes.OK).json({ status: "Success", criminalDictionary });
});


// @decs Get All Criminal Dictionary
// @route GET /api/v1/criminalDictionary
// @ptotect Protected/Admin/Manager
exports.getAllCriminalDictionary = asyncHandler(async (req, res) => {
  const allCriminalDictionary = await CriminalDictionary.find({ title: { $ne: "Videos" } }).select('-videos -__v');
  res.status(StatusCodes.OK)
    .json({ status: "Success", count: allCriminalDictionary.length, AllCriminalDictionary: allCriminalDictionary });
});


// @decs Get Specific Criminal Dictionary
// @route GET /api/v1/criminalDictionary/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificCriminalDictionary = asyncHandler(async (req, res) => {
  const criminalDictionary = await CriminalDictionary.findById(req.params.id).select('-videos -__v');
  res.status(StatusCodes.OK).json({ status: "Success", criminalDictionary });
});

// @decs Remove Criminal Dictionary
// @route DELET /api/v1/criminalDictionary/:id
// @ptotect Protected/Admin/Manager
exports.removeCriminalDictionary = asyncHandler(async (req, res) => {
  await CriminalDictionary.findByIdAndRemove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});
