
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');
const { uploadImageToCloudinary, deletedImageFromCloudinary } = require('../utils/cloudinary');

// @decs Add Question
// @route POST /api/v1/questions
// @ptotect Protected/Admin/Manager
exports.addQuestion = asyncHandler(async (req, res) => {
  const image = await uploadImageToCloudinary(req.file.path, "LegalAdviceQaustions");
  req.body.image = image;
  const question = await Question.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", question });
});

// @decs Get All Questions
// @route GET /api/v1/questions
// @ptotect Protected/User/Manager/Admin
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).select('title image');
  res.status(StatusCodes.OK).json({ status: "Success", count: questions.length, questions });
});


// @decs Get Specific Questions
// @route GET /api/v1/questions/:id
// @ptotect Protected/User/Manager/Admin
exports.getSpecificQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.findById(req.params.id).select('subTitle -_id');
  res.status(StatusCodes.OK).json({ status: "Success", count: questions.length, questions });
});


// @decs Update Specific Question
// @route GET /api/v1/questions/:id
// @ptotect Protected/Manager/Admin
exports.updateQuestion = asyncHandler(async (req, res) => {
  let question;
  if (req.file) {
    question = await Question.findById(req.params.id)
    const public_id = `${question.image.split('/')[7]}/${question.image.split('/')[8]}`.split('.')[0]
    deletedImageFromCloudinary(public_id);
    const image = await uploadImageToCloudinary(req.file.path, "LegalAdviceQaustions");
    req.body.image = image;
  }
    question = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(StatusCodes.OK).json({ status: "Success", question });
});


// @decs Remove Specific Question
// @route DELETE /api/v1/questions/:id
// @ptotect Protected/Manager/Admin
exports.deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);
  const public_id = `${question.image.split('/')[7]}/${question.image.split('/')[8]}`.split('.')[0]
  deletedImageFromCloudinary(public_id);
  res.status(StatusCodes.NO_CONTENT).send();
});