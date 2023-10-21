"use strict"

let express = require('express');
let router = express.Router();
const token = require('../../controllers/user');



/* GET users listing. */
router.post('/', token.signin); // email,pw로 회원가입이 된 상태에서
                                // db에서 데이터를 가져왔다고 가정후 로그인
                                // signin 후 jwt토큰 생성.




module.exports = router;