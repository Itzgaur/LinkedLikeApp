import Post from '../models/postModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import cloudinary from '../utils/cloudinary.js';
import path from 'path';

const createPost = asyncErrorHandler(async function (req, res, next) {
  const { content, image } = req.body;
  let newPost;

  if (image) {
    const imageResult = await cloudinary.uploader.upload(image);
    newPost = new Post({
      author: req.user._id,
      content,
      image: imageResult.secure_url,
    });
  } else {
    newPost = new Post({
      author: req.user._id,
      content,
    });
  }

  await newPost.save();

  res.status(201).json({
    Success: true,
    data: { newPost },
  });
});

const getFeedPosts = asyncErrorHandler(async function (req, res, next) {
  const posts = await Post.find();

  if (!posts) {
    return next(new AppError(500, 'cannot retrives posts!'));
  }
});

export default {
  getFeedPosts,
  createPost,
};
