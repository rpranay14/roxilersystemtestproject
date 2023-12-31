var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require("mongoose")
require('dotenv').config()
const orderRouter = require('./routes/orderRouter')




var app = express();
mongoose.connect(process.env.MONGODBURL, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connection Successfull")
  }).catch((error) => console.log(error))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/order', orderRouter)





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
