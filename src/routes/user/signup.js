"use strict"

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('signup');
});

router.get('/jwt',authUtil,function(req,res,next){
    res.json({message : req.email+"님 환영합니다."})
    
})


module.exports = router;