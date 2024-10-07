import AppError from '../utils/appError.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';

const signUp = asyncErrorHandler(function (req, res, next) {
  console.log(`inside signup`);
  throw next(new AppError(404, 'something went wrong'));
});

export default {
  signUp,
};
