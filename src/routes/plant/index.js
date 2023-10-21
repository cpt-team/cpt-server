"use strict"

let express = require('express');
let router = express.Router();

router.use('/plants', require('./plants'));

module.exports = router;