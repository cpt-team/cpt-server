"use strict"

let express = require('express');
let router = express.Router();

router.use('/plant', require('./plant'));

module.exports = router;