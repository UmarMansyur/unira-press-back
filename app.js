require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const { responseError } = require('./utils/response.handler');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use('/', indexRouter);

app.use('/uploads', express.static('uploads'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, _next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(
    err
  );
  return responseError(res, err.message, err.code);
});

module.exports = app;
