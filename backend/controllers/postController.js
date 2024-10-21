import Post from '../models/postModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const createPost = asyncErrorHandler(async function (req, res, next) {
  const { content, image } = req.body;
  let newPost;
  console.log(`inside creating post`);

  if (image) {
    // const imageResult = await cloudinary.uploader.upload(image);
    newPost = new Post({
      author: req.user._id,
      content,
      image,
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

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully',
  });
});

export default {
  getFeedPosts,
  createPost,
  deletePost,
};
