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
    callAllOdos: async (req,res)=>{ // 유저의 한 줄 일기 가져오기
        const {uid,year,month} = req.query;
        var date
        console.log(uid)
<<<<<<< HEAD

        
=======
        // 날짜 10 밑으로는 0 붙여주기!
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
        if(Number(month) < 10){
            date = `${year}-0${month}`
        }
        else{
            date = `${year}-${month}`
        }
        console.log(date)
<<<<<<< HEAD


        
=======
        function isEmptyArr(arr)  {
            if(Array.isArray(arr) && arr.length === 0)  {
              return true;
            }
            return false;
          }
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
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

    createOdos: async (req,res)=>{ // 한 줄 일기 만드는 부분
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
        
<<<<<<< HEAD

        // emotion
        var emotions = await Emotion.find({user:uid,emotions:{$elemMatch:{name:emotion}}},{_id:0,user:0})

        if(emotion === "null" || emotions == null){
            console.log("emotion doesn't exist")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.EMOTION_NOT_EXIST))
=======
        // emotion 검증
        var emotions = await Emotion.find({user:uid, emotions:{$elemMatch:{name:emotion}}}, {_id:0, user:0})
        if(emotion === "null" || emotions == null){
            console.log("emotion 존재하지 않음")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST, responseMsg.EMOTION_NOT_EXIST))
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
        }
        else {
            console.log("emotion exist")
        }
<<<<<<< HEAD
        


        // whether
        var whethers = await Whether.find({user:uid,whethers:{$elemMatch:{name:whether}}},{_id:0,user:0})
        if(whether === "null" || whethers == null) {
            console.log("whether doesn't exist")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.WHETHER_NOT_EXIST))
=======
        // whether 검증
        var whethers = await Whether.find({user:uid, whethers:{$elemMatch:{name:whether}}}, {_id:0, user:0})
        if(whether === "null" || whethers == null) {
            console.log("whether 존재하지 않음")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST, responseMsg.WHETHER_NOT_EXIST))
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
        }
        else {
            console.log("whether exist")
        }
<<<<<<< HEAD
        

        // odos
        var checkOdos = await Odos.findOne({user:new ObjectId(uid),createAt:date})        
        
        if(checkOdos !== null){
            console.log("odos valided")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.ODOS_ALREADY_EXIST))
        }

        
        // odos  
        await Odos.create({content: content, createAt: date, emotion:emotion,whether:whether,user: new ObjectId(uid)})
=======
    
        // odos 존재 검증
        var checkOdos = await Odos.findOne({user: new ObjectId(uid), createAt:date}) // 오늘 날짜로 한 줄 일기 있는지 확인    
        if(checkOdos !== null){ // 존재하면 오류 보내기
            console.log("odos 중복됨")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST, responseMsg.ODOS_ALREADY_EXIST))
        }

        // odos 생성 
        await Odos.create({content: content, createAt: date, emotion:emotion,whether:whether,user: new ObjectId(uid)}) // 한 줄 일기 저장하는 부분
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
        .catch((err)=>{
            console.error(`[db] odos create error: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        console.log(date)

        await Odos.find({user:uid, createAt:date, content:content, emotion:emotion, whether:whether}, {_id:1,createAt:1}) // 저장 됐는지 확인하는 부분 같음
        .then((result)=>{
            return res.status(200).send(util.successTrue(statusCode.OK, responseMsg.ODOS_SAVE_SUCCESS, result)) // 저장 성공 메시지
        })
        .catch((err)=>{
<<<<<<< HEAD
            console.error(`[db] odos find error: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })


        
        const Oid = await Odos.find({user:uid,createAt:date,content:content,emotion:emotion,whether:whether},{_id:1})
        console.log(Oid)

        
        await User.updateOne({_id:uid},{$push:{odos: Oid}})
=======
            console.error(`[db] odos find 출력 에러: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR, responseMsg.DB_ERROR))
        })

        // 주의점!! odos 만들 때 모든 데이터 값이 같을 경우.. 이전의 데이터의 _id값이 들어감..
        const Oid = await Odos.find({user:uid, createAt:date, content:content, emotion:emotion, whether:whether}, {_id:1})
        console.log(Oid)
        await User.updateOne({_id:uid}, {$push:{odos: Oid}})
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
        .then((result)=>{
            console.log("odos updated")
        })
        .catch((e)=>{
            console.error(`[db] odos user update error: ${e}`);
        })
<<<<<<< HEAD

    }


=======
        /*
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        */
    }
>>>>>>> fb8a54fb989e26bd929d802a5f29476eaaaeaa3a
}