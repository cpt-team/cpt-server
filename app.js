"use strict";

const express = require('express')
const app = express()

// db 연동

require('dotenv').config({path:"./env"});
const connect = require('./src/bin/db');
connect();

// 안드로이드 연동
let retrofitRouter = require('./src/routes/retrofit');
let home = require('./src/routes/index')

app.use('/retrofit', retrofitRouter);
app.use('/',home);




module.exports = app;