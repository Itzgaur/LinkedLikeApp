import Notification from '../models/notificationModel.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const getUserNotifications = asyncErrorHandler(async function (req, res, next) {
  const notification = await Notification.find({
    recipient: req.user._id,
  })
    .sort({ createdAt: -1 })
    .populate('relatedUser', 'name  username')
    .populate('relatedPost', 'content ');

  res.status(200).json({
    status: 'success',
    result: notification.length,
    data: {
      notification,
    },
  });
});

export default {
  getUserNotifications,
};
