
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const New = require('../models/New');
const { uploadImageToCloudinary, deletedImageFromCloudinary } = require('../utils/cloudinary');

// @decs Add New
// @route POST /api/v1/news
// @ptotect Protected/Admin/Manager
exports.addNew = asyncHandler(async (req, res) => {
  const image = await uploadImageToCloudinary(req.file.path, "LegalAdviceNews");
  req.body.image = image;
  const newL = await New.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", new: newL });
});

// @decs Update New
// @route PATCH /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.updateNew = asyncHandler(async (req, res) => {
  if (req.file) {
    const updatedNew = await New.findById(req.params.id);
    const public_id = `${updatedNew.image.split('/')[7]}/${updatedNew.image.split('/')[8]}`.split('.')[0]
    deletedImageFromCloudinary(public_id);
    const image = await uploadImageToCloudinary(req.file.path, "LegalAdviceNews");
    req.body.image = image;
  }
  const updatedNew = await New.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", new: updatedNew });
});

// @decs Get Specific New
// @route GET /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.getSpecificNew = asyncHandler(async (req, res) => {
  const specificNew = await New.findById(req.params.id);
  res.status(StatusCodes.OK).json({ status: "Success", new: specificNew });
});


// @decs Delete Specific New
// @route DELETE /api/v1/news/:id
// @ptotect Protected/Admin/Manager
exports.deleteSpecificNew = asyncHandler(async (req, res) => {
  const specificNew = await New.findByIdAndRemove(req.params.id);
  const public_id = `${specificNew.image.split('/')[7]}/${specificNew.image.split('/')[8]}`.split('.')[0];
  deletedImageFromCloudinary(public_id)
  res.status(StatusCodes.NO_CONTENT).send();
});

// @decs Get All New
// @route GET /api/v1/news
// @ptotect Protected/Admin/Manager
exports.getAllNews = asyncHandler(async (req, res) => {
  const allNews = await New.find({}).select(' -__v');
  res.status(StatusCodes.OK).json({ status: "Success", count: allNews.length, allNews });
});


