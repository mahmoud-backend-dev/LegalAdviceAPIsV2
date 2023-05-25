const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Video = require('../models/Video');



// @decs Add Video
// @route POST /api/v1/videos
// @ptotect Protected/Admin/Manager
exports.addVideo = asyncHandler(async (req, res) => {
  const video = await Video.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", video });
});


// @decs Get All Videos
// @route GET /api/v1/videos
// @ptotect Protected/Admin/Manager
exports.getAllVideo = asyncHandler(async (req, res) => {
  const videos = await Video.find({});
  res.status(StatusCodes.OK)
    .json({ status: "Success", count: videos.length, videos });
});


// @decs Get Specific Video
// @route GET /api/v1/videos/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificVideo = asyncHandler(async (req, res) => {
  const video = await Video.findById(req.params.id).select('-videos -__v');
  res.status(StatusCodes.OK).json({ status: "Success", video });
});

// @decs Remove Specific Video
// @route DELET /api/v1/videos/:id
// @ptotect Protected/Admin/Manager
exports.removeVideo = asyncHandler(async (req, res) => {
  await Video.findByIdAndRemove(req.params.id);
  res.status(StatusCodes.NO_CONTENT).send();
});
