const jwt = require('../modules/jwt');
const MSG = require('../modules/responseMessage');
const CODE = require('../modules/statusCode');
const util = require('../modules/utils');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkToken: async (req, res, next) => {
        var token = req.headers.token;
        //console.log(token)
        // 토큰 없음
        if (!token)
            return res.status(CODE.BAD_REQUEST).json(MSG.EMPTY_TOKEN);
        
            // decode
        const user = await jwt.verify(token);
        console.log(user)

        // 유효기간 만료
        if (user === TOKEN_EXPIRED)
            return res.status(CODE.UNAUTHORIZED).json(MSG.EXPIRED_TOKEN);
        
        
            // 유효하지 않는 토큰
        if (user === TOKEN_INVALID)
            return res.status(CODE.UNAUTHORIZED).json(MSG.INVALID_TOKEN);
        if (user.email === undefined)
            return res.status(CODE.UNAUTHORIZED).json(MSG.INVALID_TOKEN);
    
        
        req.email = user.email;
        req.pw = user.pw;
        //console.log(req.email)
        //console.log(req.pw)
        next();
    }
}

module.exports = authUtil;