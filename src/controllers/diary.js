const Diary = require('../models/diary')
const User = require('../models/user')

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
        const {id} = req.params;



        try{
            const idx = new ObjectId(id)
            console.log(idx)

            await Diary.findOne({_id: idx},{_id:0,user:0})
            .then((result)=>{
                if(result.length !== 0){
                    console.log(result)
                    res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
                }
                else{
                    res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
                }
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
    
    callAllDiary: async (req,res)=>{
        const {uid,year,month} = req.body;

        console.log(uid)
        const date = `${year}-${month}`


        await Diary.find({createAt: {$regex: date},user:{_id:uid}})
        .then((result)=>{
            if(result.length !== 0){
                console.log(result)
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
            }
            else{
                res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
            }
       })
        .catch((e)=>{
            console.error(`[db] user create error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
       })
       
       

    },
    createDiary: async (req,res)=>{
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
        const {uid,title,content,emotion,whether} = req.body;
        console.log(title,content,emotion,whether);
        console.log(date);

        // user _id
        console.log(uid);

        
        // 다이어리 생성 
        await Diary.create({user:uid,title: title, content: content, createAt: date,emotion:emotion,whether:whether})
        .then(async (result)=>{
            res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_SAVE_SUCCESS,result))
        })
        .catch((err)=>{
            console.error(`[db] user create error: ${err}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        console.log(date)


        // 주의점!! 다이어리 만들 때 모든 데이터 값이 같을 경우.. 이전의 데이터의 _id값이 들어감..
        const Did = await Diary.findOne({user:uid,createAt:date,title:title,content:content,emotion:emotion,whether:whether},{_id:1})
        console.log(Did)

        await User.updateOne({_id:uid},{$push:{diaries: Did}})
        
        moment = require('moment-timezone')
        moment.tz.setDefault("Asia/Seoul")
        var date = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    },
    updateDiary: async(req,res)=>{
        const {title, content} = req.body;
        
        const {id} = req.params

        try{
            const idx = new ObjectId(id)
            console.log(idx)

            await Diary.updateOne({_id: idx},{$set: {title: title, content: content}})
            .then((result)=>{
                
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