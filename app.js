/**
 * @file app.js
 * @summary Main file of the application
 * @description This file is the main file of the application. It is used to define the application and its routes.
 */


/**
 * Module dependencies.
 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');



/**
 * Get all routers from routes folder
 */
let mainPageRouter = require('./routes/mainPage');
let usersRouter = require('./routes/users');
let helpRouter = require('./routes/help');
let configRouter = require('./routes/configuration');
let contactRouter = require('./routes/contact');
let MetricInsightRouter = require('./routes/MetricInsight');
let loginRouter = require('./routes/login');
let apiMetricInsightRouter = require('./routes/api/MetricInsight');

// Create the application
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Precise the routes to use
app.use('/', mainPageRouter);
app.use('/users', usersRouter);
app.use('/help', helpRouter);
app.use('/configuration', configRouter);
app.use('/contact', contactRouter);
app.use('/MetricInsight', MetricInsightRouter);
app.use('/login', loginRouter);
app.use('/api/MetricInsight', apiMetricInsightRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
