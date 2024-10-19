import jwt, { decode } from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const protect = asyncErrorHandler(async function (req, res, next) {
  console.log(`inside protect middlware`);

  const token = req.cookies['jwt-linkedin'];

  if (!token) {
    return next(new AppError(401, `you are not logged In. Please login first`));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new AppError(401, 'Token expired!'));
  }

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    return next(new AppError(404, 'No user found'));
  }

  req.user = user;
  next();
});

const checkRoles = function (req, res, next) {
  console.log('checking roles');
};

export default {
  checkRoles,
  protect,
};
