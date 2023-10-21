"use strict"

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken

router.get('/', authUtil,function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;