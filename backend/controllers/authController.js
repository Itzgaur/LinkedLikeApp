import jwt from 'jsonwebtoken';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import User from '../models/userModel.js';
import AppError from '../utils/appError.js';

// /signing the JWT token
const signToken = function (data) {
  return jwt.sign({ ...data }, process.env.JWT_SECRET);
};

const createAndSendToken = function (res, statusCode, user) {
  const token = signToken({
    username: user.username,
    email: user.email,
    id: user._id,
  });

  res.cookie('jwt-linkedin', token, {
    httpOnly: true, // prevent XSS attack
    maxAge: 60 * 60 * 1000,
    sameSite: 'strict', // prevent CSRF attacks,
    secure: process.env.NODE_ENV === 'production', // prevents man-in-the-middle attacks
  });

  res.status(statusCode).send({
    user,
    token,
  });
};

//signup new User
const signUp = asyncErrorHandler(async function (req, res, next) {
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return next(new AppError(400, 'please provide all the details'));
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return next(new AppError(400, `user already exists!`));
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return next(new AppError(400, `username is already taken!`));
  }

  const newUser = await User.create({
    username,
    name,
    email,
    password,
  });

  createAndSendToken(res, 201, newUser);
});

//login
const login = asyncErrorHandler(async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError(404, 'please provide username & password'));
  }

  const user = await User.findOne({ username });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(400, 'either username or password is incorrect!'));
  }

  createAndSendToken(res, 200, user);
});

const logout = asyncErrorHandler(async function (req, res, next) {
  res.clearCookie('jwt-linkedin');
  res.json({ message: 'Logged out successfully' });
});

const getCurrentUser = asyncErrorHandler(async function (req, res, next) {
  const user = req.user;
  if (!user) return next(new AppError(404, 'cannnot find the user'));

  res.status(200).json({
    user,
  });
});

export default {
  signUp,
  login,
  getCurrentUser,
  logout,
};
