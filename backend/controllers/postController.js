import Notification from '../models/notificationModel.js';
import Post from '../models/postModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import cloudinary from '../utils/cloudinary.js';

const createPost = asyncErrorHandler(async function (req, res, next) {
  const { content, image } = req.body;
  let newPost;
  console.log(`inside creating post`);

  if (image) {
    const imageResult = await cloudinary.uploader.upload(image, {
      folder: 'linkedIn',
    });
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

  console.log(`saving post`);
  await newPost.save();

  res.status(201).json({
    Success: true,
    data: { newPost },
  });
});

const getFeedPosts = asyncErrorHandler(async function (req, res, next) {
  const posts = await Post.find({
    author: { $in: [req.user._id, ...req.user.connections] },
  })
    .populate('author', 'name username profilePicture headline')
    .populate('comment.user', 'name profilePicture')
    .sort({ _id: -1 });

  if (!posts) {
    return next(new AppError(500, 'cannot retrives posts!'));
  }

  res.status(200).json({
    success: true,
    data: { posts },
  });
});

const deletePost = asyncErrorHandler(async function (req, res, next) {
  const postId = req.params.postId;
  const userId = req.user._id;
  console.log(`postId: ${postId}`);
  console.log(`userId: ${userId}`);

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError(404, 'Post not found'));
  }

  if (post.author.toString() !== userId.toString()) {
    return next(new AppError(403, 'Unauthorized to delete this post'));
  }

  const deletedPost = await Post.findByIdAndDelete(postId);
  await Notification.deleteMany({ relatedPost: postId });

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});

const likePost = asyncErrorHandler(async function (req, res, next) {
  const postId = req.params.id;
  const userId = req.user._id;

  const post = await Post.findById(postId).select('-image');

  //if user is there already, unlike the post
  if (post?.likes?.includes(userId)) {
    await Notification.findOneAndDelete({
      relatedUser: userId,
      relatedPost: postId,
      type: 'like',
    });
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);

    const newNotification = new Notification({
      recipient: post.author,
      relatedPost: postId,
      relatedUser: userId,
      type: 'like',
    });
    await newNotification.save();
  }

  await post.save();
  res.status(200).json({
    success: true,
    data: { post },
  });
});

const createComment = asyncErrorHandler(async function (req, res, next) {
  const postId = req.params.id;
  const userId = req.user._id;
  const { content } = req.body;

  const post = await Post.findById(postId)
    .select('-image')
    .populate('author', 'name email username headline profilePicture');

  if (!post) {
    return next(new AppError(404, 'Post not found'));
  }

  post.comment.push({ content, user: userId });
  await post.save();

  if (post.author._id.toString() !== userId.toString()) {
    const newNotification = new Notification({
      recipient: post.author,
      relatedPost: postId,
      relatedUser: userId,
      type: 'comment',
    });
    await newNotification.save();
  }

  res.status(201).json({
    success: true,
    data: { post },
  });
});

export default {
  getFeedPosts,
  createPost,
  deletePost,
  likePost,
  createComment,
};
