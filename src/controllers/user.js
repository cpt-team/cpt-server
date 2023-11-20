const jwt = require('../modules/jwt');
const User = require('../models/user')
const emotion = require('../controllers/emotion')
const whether = require('../controllers/whether')

const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul")


module.exports = {
    siginup : async (req, res) =>{

        const {email, name, pw, birth} = req.body;
        var date = moment(birth).format('YYYY-MM-DD')

        await User.findOne({email: email})
        .then(async (result)=>{
            
            if(result === null){
                await User.create({email: email, name: name,pw: pw, birth: date})
                        .then(()=>{
                        res.status(200).send(util.successTrue(statusCode.OK,responseMsg.SIGNUP_SUCCESS))
                })
                .catch((err)=>{
                    console.error(`[db] user create error: ${err}`);
                    res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.USER_INSERT_FAIL))
                })
                
            }
            else if(result.email.length !== 0){
                res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.SIGNUP_FAIL))
        
            }
        })
        .catch((err)=>{
            console.error(`[db] user find error: ${err}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        
        const uid = await User.findOne({email: email}, {_id:1})
        console.log(uid);
        
        // emotion, whether 초기화
        emotion.setDefaultEmotion(uid)
        whether.setDefaultWhether(uid)
       

    },

    signin : async ( req, res ) => {
        
        const {email, pw} = req.body;

        await User.findOne({email: email}, {pw : 1, _id:1})
        .then(async (user)=>{
                if(user === null){
                    return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.NO_USER))
                }


                if(user.pw === pw){
                    jwtToken = await jwt.sign(user);
                    
                    const user1 = JSON.parse(JSON.stringify(user))
                    console.log(user)
                    const data = Object.assign(user1,{token:jwtToken})
                    console.log(data)
                    
                    return res.status(200).send(util.successTrue(statusCode.OK,responseMsg.LOGIN_SUCCESS,[data]))
                    
                }
                else{
                    return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.MISS_MATCH_PW))
                }
        }).catch((err)=>{
            console.error(err);
        })
        
    }
}