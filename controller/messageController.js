const fs = require('fs');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Message = require('../models/Message');
const { BadRequest } = require('../errors');
const  { uploadImageToCloudinary , deletedImageFromCloudinary} = require('../utils/cloudinary')

// @decs Send Message To lawyer
// @route POST /api/v1/messages
// @ptotect Protected/User
exports.sendMessage = asyncHandler(async (req, res) => {
  
  if (req.files) {
    if (req.files.image) {
      const image = await uploadImageToCloudinary(req.files.image[0].path,"LegalAdviceClient");
      req.body.image = image
    }
    if (req.files.file) {
      req.body.file = `${process.env.BASE_URL}/Client/${req.files.file[0].filename}`
    }
  }

  if (Object.keys(req.body).length == 0)
    return res.status(StatusCodes.NO_CONTENT).send()
  req.body.user = req.user._id;
  const message = await Message.create(req.body);
  res.status(StatusCodes.OK).json({ status: "Success", message });
});

// @decs Get Specific Messages
// @route GET /api/v1/messages/:id
// @ptotect Protected/Manager/Admin/User
exports.getSpecificMessage = asyncHandler(async (req, res) => {
  let message;
  if (req.user.role === 'admin' || req.user.role === 'manager') {
    message = await Message.findById(req.params.id)
    return res.status(StatusCodes.OK).json({ status: "Success", message });
  }
  message = await Message.findOne({ _id: req.params.id, user: req.user._id });
  if (!message)
    throw new BadRequest(`You not are have this message`)
  res.status(StatusCodes.OK).json({ status: "Success", message });
})


// @decs Update Specific Messages
// @route PATCH /api/v1/messages/:id
// @ptotect Protected/User
exports.updateSpecificMessage = asyncHandler(async (req, res) => {
  if (req.files) {
    if (req.files.image) {
      const image = await uploadImageToCloudinary(req.files.image[0].path);
      req.body.image = image
    }
    if (req.files.file) {
      req.body.file = `${process.env.BASE_URL}/Client/${req.files.file[0].filename}`
    }
  }
  if (Object.keys(req.body).length === 0)
    return res.status(StatusCodes.NO_CONTENT).send();
  const message = await Message.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id
    },
    req.body,
    { new: true }
  );
  if (!message)
    throw new BadRequest(`You not are have this message`)
  res.status(StatusCodes.OK).json({ status: "Success", message });
})


// @decs Remove Specific Message
// @route DELETE /api/v1/messages/:id
// @ptotect Protected/Manager/Admin/User
exports.deleteMessage = asyncHandler(async (req, res) => {
  let message;
  if (req.user.role === 'admin' || req.user.role === 'manager') {
    message = await Message.findByIdAndRemove(req.params.id)
    if (message.image) {
      const path = `./uploads/Client/${message.image.split('/')[4]}`;
      fs.unlinkSync(path);
    }
    if (message.file) {
      const path = `./uploads/Client/${message.file.split('/')[4]}`;
      fs.unlinkSync(path);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
  message = await Message.findOneAndRemove({ _id: req.params.id, user: req.user._id });
  if (!message)
    throw new BadRequest(`You not are have this message`)
  if (message.image) {
    const path = `./uploads/Client/${message.image.split('/')[4]}`;
    fs.unlinkSync(path);
  }
  if (message.file) {
    const path = `./uploads/Client/${message.file.split('/')[4]}`;
    fs.unlinkSync(path);
  }
  res.status(StatusCodes.NO_CONTENT).send();
});

// @decs Get My Messages
// @route GET /api/v1/messages/me
// @ptotect Protected/User
exports.getMyMessage = asyncHandler(async (req, res) => {
  const myMessages = await Message.find({ user: req.user._id });
  if (myMessages.length === 0)
    return res.status(StatusCodes.NO_CONTENT).send();
  res.status(StatusCodes.OK).json({ status: "Success", count: myMessages.length, myMessages });
})

// @decs Get All Messages
// @route GET /api/v1/messages
// @ptotect Protected/Manager/Admin
exports.getAllMessages = asyncHandler(async (req, res) => {
  const allMessages = await Message.find({}).select(' -__v');
  res.status(StatusCodes.OK).json({ status: "Success", count: allMessages.length, allMessages });
});
