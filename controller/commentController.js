const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { BadRequest } = require('../errors');
const Comment = require('../models/Comment');


// @decs Add Comment To Post
// @route POST /api/v1/posts/:id/comments
// @ptotect Protected/User
exports.addCommentToPost = asyncHandler(async (req, res) => {
  const io = req.app.get("SocketIO");
  req.body.user = req.user._id;
  req.body.post = req.params.id;
  const post = await (await Comment.create(req.body)).populate({
    path: "user",
    select: 'name'
  });
  io.on('connection',  (client) => { 
    client.on('forAddCommentToPost', (postId) => {
      if (postId === req.params.id) {
        io.emit('addComment',post)
      }
    })
  })
  res.status(StatusCodes.OK).json({ status: "Success", post });
});

// @decs Get All Comment Of This Post 
// @route GET /api/v1/posts/:id/comments
// @ptotect Protected/User/Manager/Admin
exports.getAllComment = asyncHandler(async (req, res) => {
  const allComment = await Comment.find({ post: req.params.id }).populate({
    path: 'user',
    select: 'name -_id'
  });
  if (allComment.length === 0)
    return res.status(StatusCodes.NO_CONTENT).send();
  res.status(StatusCodes.OK).json({ status: "Success", count: allComment.length, allComment });
});


// @decs Update Specific Comment In Post
// @route PATCH /api/v1/posts/:id/comments/:commentId
// @ptotect Protected/User
exports.updateComment = asyncHandler(async (req, res) => {
  const io = req.app.get("SocketIO");
  if (Object.keys(req.body).length === 0)
    return res.status(StatusCodes.NO_CONTENT).send();
  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId,
      user: req.user._id,
      post: req.params.id
    },
    req.body,
    {
      new: true
    }
  );
  if (!comment)
    throw new BadRequest('You are not the owner of this comment ');
  
  io.on("connection", (client) => {
    client.on('forUpdateCommentFromPost', (data) => {
      if (data.postId === req.params.id && data.commentId === req.params.commentId) {
        io.emit('updateComment', comment)
      }
    })
  })
  res.status(StatusCodes.OK).json({ status: "Success", comment });
});

// @decs Delete Specific Comment
// @route DELETE /api/v1/posts/:id/comments/:commentId
// @ptotect Protected/User/Manager/Admin
exports.deleteComment = asyncHandler(async (req, res) => {
  const io = req.app.get("SocketIO");
  if (req.user.role === 'manager' || req.user.role === 'admin') {
    await Comment.findByIdAndRemove(req.params.commentId)
    return res.status(StatusCodes.NO_CONTENT).send();
  }
  const comment = await Comment.findOneAndRemove(
    {
      _id: req.params.commentId,
      user: req.user._id,
      post: req.params.id
    }
  );
  if (!comment)
    throw new BadRequest('You are not the owner of this comment')

  io.on("connection", (client) => {
    client.on('forDeleteCommentFromPost', (data) => {
      if (data.postId === req.params.id && data.commentId === req.params.commentId) {
        io.emit('deleteComment', comment._id)
      }
    })
  })
  res.status(StatusCodes.NO_CONTENT).send();
})