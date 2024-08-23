const responseSuccess = (res, data, message, code) => {
  res.status(code || 200).json({
    status: 'success',
    message,
    data,
  });
}

const responseError = (res, error, message, code) => {
  res.status(code || 500).send({
    status: 'error',
    message,
    error,
  });
}

module.exports = {
  responseSuccess,
  responseError,
};