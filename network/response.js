exports.success = function (
  req,
  res,
  message = "Internal server error",
  status = 500
) {
  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};

exports.error = function (
  req,
  res,
  message = "Internal server error",
  status = 500
) {
  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};
