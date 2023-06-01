
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const Post = require('../models/Post');
const { BadRequest } = require('../errors');
const { uploadImageToCloudinary, deletedImageFromCloudinary } = require('../utils/cloudinary');
const Comment = require('../models/Comment');
// @decs Add Post
// @route POST /api/v1/posts
// @ptotect Protected/User
exports.addPost = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0 && !req.file)
    return res.status(StatusCodes.NO_CONTENT).send();
  if (req.file) {
    const image = await uploadImageToCloudinary(req.file.path, "LegalAdvicePosts");
    req.body.image = image;
  }
  req.body.user = req.user._id;
  const post = await Post.create(req.body)
  res.status(StatusCodes.OK).json({ status: "Success", post });
});

// @decs Update Post
// @route PATCH /api/v1/posts/:id
// @ptotect Protected/User
exports.updatePost = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0 && !req.file)
    return res.status(StatusCodes.NO_CONTENT).send();
  const post = await Post.findById(req.params.id);
  if (req.file) {
    if (post.image) {
      const public_id = `${post.image.split('/')[7]}/${post.image.split('/')[8]}`.split('.')[0];
      deletedImageFromCloudinary(public_id);
    }
    const image = await uploadImageToCloudinary(req.file.path, "LegalAdvicePosts");
    req.body.image = image;
  }
  req.body.user = req.user._id;
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ status: "Success", post: updatedPost });
});

// @decs Get Specific Posts
// @route GET /api/v1/posts/:id
// @ptotect Protected/User/Manager/Admin
exports.getSpecificPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id });
  const post = await Post.findById(req.params.id);
  res.status(StatusCodes.OK).json({ status: "Success", numberOfComments: comments.length, post });
})

// @decs Delete Specific Posts
// @route DELETE /api/v1/posts/:id
// @ptotect Protected/User/Manager/Admin
exports.deleteSpecificPost = asyncHandler(async (req, res) => {
  let post;
  if (req.user.role === 'manager' || req.user.role === 'admin') {
    post = await Post.findByIdAndRemove(req.params.id)
    const public_id = `${post.image.split('/')[7]}/${post.image.split('/')[8]}`.split('.')[0];
    deletedImageFromCloudinary(public_id);
    return res.status(StatusCodes.NO_CONTENT).send();
  }
  post = await Post.findOneAndRemove({ user: req.user._id, _id: req.params.id });
  if (!post)
    throw new BadRequest('You are not the owner of this post')
  const public_id = `${post.image.split('/')[7]}/${post.image.split('/')[8]}`.split('.')[0];
  deletedImageFromCloudinary(public_id);
  res.status(StatusCodes.NO_CONTENT).send();
})

// @decs Get All Posts
// @route GET /api/v1/posts
// @ptotect Protected/User/Manager/Admin
exports.getAllPosts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const endIndex = limit * page;
  const countDocs = await Post.countDocuments();
  const pagination = {};
  pagination.currentPage = page;
  pagination.limit = limit;
  pagination.numOfPages = Math.ceil(countDocs / limit);
  //next Page
  if (endIndex < countDocs)
    pagination.next = page + 1;
  if (skip > 0)
    pagination.prev = page - 1;
  const allPosts = await Post.aggregate([{
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'post',
      as: 'comments'
    },
  },
    {
      $project: {
        user: 1,
        text: 1,
        image: 1,
        likes: 1,
        createdAt: 1,
        updatedAt: 1,
        numberOfComments:{$size:"$comments"}
    }
    },
    { $skip: skip },
    { $limit: limit },
  ])
  res.status(StatusCodes.OK).json({
    status: "Success",
    count: allPosts.length,
    pagination,
    allPosts
  });
});


// @decs Get All Likes
// @route GET /api/v1/posts/:id/likes
// @ptotect Protected/User/Manager/Admin
exports.getAllLikes = asyncHandler(async (req, res) => {
  const allLikes = await Post.findById(req.params.id);
  if (allLikes.length === 0)
    return res.status(StatusCodes.NO_CONTENT).send();
  res.status(StatusCodes.OK).json({ status: "Success", count: allLikes.likes.length, allLikes: allLikes.likes });
});

// @decs Add Like
// @route POST /api/v1/posts/:id/likes
// @ptotect Protected/User
exports.addLike = asyncHandler(async (req, res) => {
  const likes = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", count: likes.likes.length, likes: likes.likes });
}
);

// @decs Delete Like
// @route DELETE /api/v1/posts/:id/likes
// @ptotect Protected/User
exports.deleteLike = asyncHandler(async (req, res) => {
  const likes = await Post.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ status: "Success", count: likes.likes.length, likes: likes.likes });
}
);
