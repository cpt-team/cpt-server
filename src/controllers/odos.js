const Odos = require('../models/odos')
const User = require('../models/user')
const Emotion = require('../models/emotion')
const Whether = require('../models/whether')

const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')
const ObjectId = require('mongoose').Types.ObjectId
const funs = require('../modules/funArr')


// KST
var moment = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

//date = moment().format('YYYY-MM-DD HH:mm:ss')


module.exports = {
    callAllOdos: async (req,res)=>{
        const {uid,year,month} = req.query;
        var date
        console.log(uid)

        // 날짜 10 밑으로는 0 붙여주기!
        if(Number(month) < 10){
            date = `${year}-0${month}`
        }
        else{
            date = `${year}-${month}`
        }
        
        console.log(date)

        function isEmptyArr(arr)  {
            if(Array.isArray(arr) && arr.length === 0)  {
              return true;
            }
            
            return false;
          }

        
        await Odos.find({createAt: {$regex: date},user:{_id:uid}},{user:0})
        .then((result)=>{
            console.log(result)
            if(result === null || funs.isEmptyArr(result)){
                res.status(200).send(util.successFalse(statusCode.OK,responseMsg.ODOS_GET_FAIL))
            }
            else{
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.ODOS_GET_SUCCESS,result))
            }
       })
        .catch((e)=>{
            console.error(`[db] call odos error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
       })
       
    },
    createOdos: async (req,res)=>{
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD')
        console.log(req.body)
        const {uid,content,emotion,whether} = req.body;
        console.log(content,emotion,whether);
        console.log(date);

        // user _id
        console.log(uid);

        console.log(new ObjectId(uid))
        

        // emotion 검증
        var emotions = await Emotion.find({user:uid,emotions:{$elemMatch:{name:emotion}}},{_id:0,user:0})

        if(emotion === "null" || emotions == null){
            console.log("emotion 존재하지 않음")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.EMOTION_NOT_EXIST))
        }
        else {
            console.log("emotion 존재")
        }
        


        // whether 검증
        var whethers = await Whether.find({user:uid,whethers:{$elemMatch:{name:whether}}},{_id:0,user:0})
        if(whether === "null" || whethers == null) {
            console.log("whether 존재하지 않음")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.WHETHER_NOT_EXIST))
        }
        else {
            console.log("whether 존재")
        }
        

        // odos 존재 검증
        var checkOdos = await Odos.findOne({user:new ObjectId(uid),createAt:date})        
        
        if(checkOdos !== null){
            console.log("odos 중복됨")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.ODOS_ALREADY_EXIST))
        }

        
        // odos 생성 
        await Odos.create({content: content, createAt: date, emotion:emotion,whether:whether,user: new ObjectId(uid)})
        .catch((err)=>{
            console.error(`[db] odos create 출력 에러: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        console.log(date)

        await Odos.find({user:uid,createAt:date,content:content,emotion:emotion,whether:whether},{_id:1,createAt:1})
        .then((result)=>{
            return res.status(200).send(util.successTrue(statusCode.OK,responseMsg.ODOS_SAVE_SUCCESS,result))
        })
        .catch((err)=>{
            console.error(`[db] odos find 출력 에러: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })


        // 주의점!! odos 만들 때 모든 데이터 값이 같을 경우.. 이전의 데이터의 _id값이 들어감..
        const Oid = await Odos.find({user:uid,createAt:date,content:content,emotion:emotion,whether:whether},{_id:1})
        console.log(Oid)

        //
        await User.updateOne({_id:uid},{$push:{odos: Oid}})
        .then((result)=>{
            console.log("유저에 odos업데이트 성공")
        })
        .catch((e)=>{
            console.error(`[db] odos user update 출력 에러: ${e}`);
        })

        /*
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        */
    
    }

    

}