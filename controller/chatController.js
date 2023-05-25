const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const Chat = require('../models/Chat');

// @decs Add Comment To Post
// @route POST /api/v1/chat/messages/:id
// @ptotect Protected/User/Admin/Manager
exports.getAllMessagesOfChat = asyncHandler(async (req, res) => {
  const messages = await Chat.find({ $or: [{ sender: req.params.id }, { recipient: req.params.id }] }).sort('createAt');
  res.status(StatusCodes.OK).json({ status: "Success", count: messages.length, messages });
});

