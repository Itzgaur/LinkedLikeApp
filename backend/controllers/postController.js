import Post from '../models/postModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import cloudinary from '../utils/cloudinary.js';
import path from 'path';

const createPost = asyncErrorHandler(async function (req, res, next) {
  const { content, image } = req.body;

  const result = await cloudinary.uploader.upload(image);

  console.log(result);
  res.json({
    message: 'post is created',
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
