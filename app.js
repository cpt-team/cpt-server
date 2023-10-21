"use strict";

const express = require('express')
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const connect = require('./src/modules/db');
connect();

//var createError = require('http-errors');


// 라우팅
let retrofitRouter = require('./src/routes/retrofit');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');



app.use('/retrofit', retrofitRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);




/* catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
*/



module.exports = app;