/**
 * @file app.js
 * @module app
 * @description This file is the main file of the application. It is used to define the application and its routes.
 * @date 2024-02-20
 * @version 1.0
 * @copyright Copyright (c) 2024 MetricInsight  All rights reserved.
 * @requires createError
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires logger
 * @requires routes/mainPage
 * @requires routes/users
 * @requires routes/help
 * @requires routes/configuration
 * @requires routes/contact
 * @requires routes/MetricInsight
 * @requires routes/login
 * @requires routes/documentation
 * @requires routes/api/MetricInsight
 */


let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let mainPageRouter = require('./routes/mainPage');
let usersRouter = require('./routes/users');
let helpRouter = require('./routes/help');
let configRouter = require('./routes/configuration');
let contactRouter = require('./routes/contact');
let MetricInsightRouter = require('./routes/MetricInsight');
let loginRouter = require('./routes/login');
let documenationRouter = require('./routes/documentation');
let apiMetricInsightRouter = require('./routes/api/MetricInsight');

// Create the application
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Use the following middlewares
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Precise the routes to use
 */
app.use('/', mainPageRouter);
app.use('/users', usersRouter);
app.use('/help', helpRouter);
app.use('/configuration', configRouter);
app.use('/contact', contactRouter);
app.use('/MetricInsight', MetricInsightRouter);
app.use('/login', loginRouter);
app.use('/documentation', documenationRouter);
app.use('/api/MetricInsight', apiMetricInsightRouter);

/**
 * Route
 * @name error
 * @function
 * @memberof module:app~app
 * @inner
 */
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
