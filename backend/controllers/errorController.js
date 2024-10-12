export default function (err, req, res, next) {
  console.log(`inside global handler`);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err.message);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}
