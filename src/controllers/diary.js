const Diary = require('../models/diary')
const User = require('../models/user')
const Emotion = require('../models/emotion')
const Whether = require('../models/whether')

const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')
const ObjectId = require('mongoose').Types.ObjectId


// KST
var moment = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

//date = moment().format('YYYY-MM-DD HH:mm:ss')


module.exports = {
    callDiary: async(req,res)=>{

        // diary_id
        const {id} = req.query;

        console.log(id)
        try{
            
            await Diary.find({_id: id},{_id:0,user:0,createAt:0})
            .then((result)=>{
                if(result !== null){
                    console.log(result)
                    res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
                }
                else{
                    res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
                }
            })
            .catch((e)=>{
                console.error(`[db] user call diary error: ${e}`);
                res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
            })

        }
        catch{
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
            }
    },
    
    callAllDiary: async (req,res)=>{
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

        await Diary.find({createAt: {$regex: date},user:{_id:uid}},{user:0})
        .then((result)=>{
            if(result !== null){
                
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
            }
            else{
                res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
            }
       })
        .catch((e)=>{
            console.error(`[db] user call diarys error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
       })
       
    },
    createDiary: async (req,res)=>{
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD')
        console.log(req.body)
        const {uid,title,content,emotion,whether} = req.body;
        console.log(title,content,emotion,whether);
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
        

        // Diary 존재 검증
        var checkDiary = await Diary.findOne({user:new ObjectId(uid),createAt:date})        
        
        if(checkDiary !== null){
            console.log("diary 중복됨")
            return res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,responseMsg.DIARY_ALREADY_EXIST))
        }

        
        // 다이어리 생성 
        await Diary.create({title: title, content: content, createAt: date, emotion:emotion,whether:whether,user: new ObjectId(uid)})
        .catch((err)=>{
            console.error(`[db] diary create 출력 에러: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        console.log(date)

        await Diary.find({user:uid,createAt:date,title:title,content:content,emotion:emotion,whether:whether},{_id:1,createAt:1})
        .then((result)=>{
            return res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_SAVE_SUCCESS,result))
        })
        .catch((err)=>{
            console.error(`[db] diary find 출력 에러: ${err}`);
            return res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })


        // 주의점!! 다이어리 만들 때 모든 데이터 값이 같을 경우.. 이전의 데이터의 _id값이 들어감..
        const Did = await Diary.find({user:uid,createAt:date,title:title,content:content,emotion:emotion,whether:whether},{_id:1})
        console.log(Did)

        await User.updateOne({_id:uid},{$push:{diaries: Did}})

        /*
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        */
    
    },


    updateDiary: async(req,res)=>{
        const {id,title, content,emotion,whether} = req.body;
        
        console.log(id)

        try{
            const idx = new ObjectId(id)
            console.log(idx)

            await Diary.updateOne({_id: idx},{$set: {title: title, content: content,emotion:emotion,whether:whether}})
            .then((result)=>{
                console.log("modified diary")
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_UPDATE_SUCCESS))
            })
            .catch((e)=>{
                console.error(`[db] user create error: ${e}`);
                res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
            })
        }
        catch{
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
        }


    },

    deleteDiary: async(req,res)=>{


        // user _id
        const {uid} = req.body;

        // diary _id
        const {id} = req.params;

        console.log(id)
        try{
        const Did = new ObjectId(await Diary.findOne({_id: id},{_id:1}))
        await User.updateOne({_id:uid},{$pull:{diaries: Did}})
        .then((result)=>{
            console.log(Did)
            console.log(result)
        })
        .catch((e)=>{
            console.error(e)
        })
        

        await Diary.deleteOne({_id: id})
        .then((result)=>{
            res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_DELETE_SUCCESS))
        })
        .catch((e)=>{
            console.error(`[db] user create error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        
    }
    catch{
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
        }
    
    }
    

}