"use strict";

const express = require('express');
const router = express.Router();

router.use('/', require('./odos'));

module.exports = router;