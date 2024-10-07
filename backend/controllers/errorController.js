export default function (err, req, res, next) {
  console.log(`inside global handler`);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}
