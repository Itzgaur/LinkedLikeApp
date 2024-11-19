import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const getSuggestedConnections = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  const currentUser = await User.findById(req.user._id);

  const suggestion = await User.find({
    _id: {
      $ne: currentUser._id,
      $nin: currentUser.connections,
    },
  })
    .select('name username profilePicture headline')
    .limit(3);

  res.status(200).json({
    status: 'Sucess',
    data: {
      suggestion,
    },
  });
});

const getProfile = asyncErrorHandler(async function (req, res, next) {
  const user = await User.findOne({ username: req.params.username }).select(
    '-password'
  );

  if (!user) {
    return next(new AppError(400, 'No user found!'));
  }

  res.status(200).json({
    status: 'Sucess',
    data: {
      user,
    },
  });
});

export default {
  getSuggestedConnections,
  getProfile,
};
