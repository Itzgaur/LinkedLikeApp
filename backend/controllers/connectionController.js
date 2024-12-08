import ConnectionRequestModel from '../models/connectionRequesModel.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const sendConnectionRequest = asyncErrorHandler(async function (
  req,
  res,
  next
) {
  const { userId } = req.params;
  const senderId = req.user._id;
  if (senderId.toString() === userId)
    return next(new AppError(400, `You can't send a request to yourself`));

  if (req.user.connections.includes(senderId))
    return next(new AppError(400, 'you are already connected'));

  const existingRequest = await ConnectionRequestModel.findOne({
    sender: senderId,
    recipient: userId,
    status: 'pending',
  });

  console.log(existingRequest);

  if (existingRequest)
    return next(new AppError(400, 'A connection request already exists'));

  const newConnectionRequest = new ConnectionRequestModel({
    sender: senderId,
    recipient: userId,
  });

  await newConnectionRequest.save();

  res.status(201).json({
    success: true,
    data: { connectionRequest: newConnectionRequest },
  });
});

const getUserConnections = asyncErrorHandler(async function (req, res, next) {
  const userId = req.user._id;
  const user = await User.findById(userId).populate(
    'connections',
    'name username profilePicture headline connections'
  );

  res.status(200).json({
    success: true,
    data: { connections: user.connections },
  });
});

export default {
  getUserConnections,
  sendConnectionRequest,
};
