const responseSuccess = (res, data, message, code) => {
  res.status(code || 200).json({
    status: true,
    message,
    data,
  });
}

const responseError = (res, message, code) => {
  res.status(code || 500).send({
    status: false,
    message
  });
}

module.exports = {
  responseSuccess,
  responseError,
};