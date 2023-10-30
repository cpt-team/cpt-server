const jwt = require('../modules/jwt');
const User = require('../models/user')
const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')

module.exports = {
    siginup : async (req, res) =>{

        const {email, name, pw, birth} = req.body;

        await User.findOne({email: email})
        .then(async (result)=>{
            // console.log(result)
            if(result === null){
                console.log("중복되는 email이 데이터에 없으므로 회원가입 성공")
                
                await User.create({email: email, name: name,
                    pw: pw, birth: birth}).then(()=>{
                        return res.status(200).send(util.successTrue(statusCode.OK,responseMsg.SIGNUP_SUCCESS))
                })
                .catch((err)=>{
                    console.error(`[db] user create error: ${err}`);
                    return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.USER_INSERT_FAIL))
                })
                
            }
            else if(result.email.length !== 0){
                console.log("중복회원 있어서 로그인 안됨")
                return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.SIGNUP_FAIL))
        
            }
        })
        .catch((err)=>{
            console.error(`[db] user find error: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        

    },

    signin : async ( req, res ) => {
        /* user정보를 DB에서 조회 */

        const {email, pw} = req.body;

        const user = await User.findOne({email: email})
        .then(async (user)=>{
                if(user === null){
                    console.log("존재하는 email이 없습니다.")
                    return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.NO_USER))
                }


                if(user.pw === pw){
                    jwtToken = await jwt.sign(user);
                    console.log("비밀번호 일치로 로그인 성공")
                    return res.status(200).send(util.successTrue(statusCode.OK,responseMsg.LOGIN_SUCCESS,jwtToken))
                }
                else{
                    console.log("비밀번호 틀림으로 로그인 실패")
                    return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.MISS_MATCH_PW))
                }
        }).catch((err)=>{
            console.error(err);
        })
        

        //jwtToken = await jwt.sign(user);

        /* user의 idx, email을 통해 토큰을 생성! */
        
        // return res.status(200).json({
        //     code: 200,
        //     message: "token is created",
        //     token: jwtToken,
        // });
        
    }
}