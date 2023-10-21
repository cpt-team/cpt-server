"use strict"

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('signup');
});

router.post('/jwt',authUtil,function(req,res,next){
    res.send(req.email +'님 인증되었습니다.')
})


module.exports = router;