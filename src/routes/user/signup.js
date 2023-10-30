"use strict"

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken
const userController = require('../../controllers/user')


// jwt 확인용 api 지워도 가능
router.get('/jwt',authUtil,function(req,res,next){
    res.json({message : req.email+"님 환영합니다."})
    
})

// 회원가입 api
router.post('/', userController.siginup)


module.exports = router;