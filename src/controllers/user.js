const jwt = require('../modules/jwt');
const User = require('../models/user')
const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')

module.exports = {







    signin : async ( req, res ) => {
        /* user정보를 DB에서 조회 */

        const { name, email, pw } = req.body;


        /*
        const user = await User.findOne({email: email, pw: pw})
        .then((user)=>{
                console.log(user);
                return user;
        })
        */

        jwtToken = await jwt.sign(user);

        /* user의 idx, email을 통해 토큰을 생성! */
        
        return res.status(200).json({
            code: 200,
            message: "token is created",
            token: jwtToken,
        });
    }
}