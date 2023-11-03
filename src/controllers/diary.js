const Diary = require('../models/diary')
const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')
const ObjectId = require('mongodb').ObjectId
// const bson = require('bson').ObjectId

// KST 설정완료
const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
var date = moment().format('YYYY-MM-DD HH:mm:ss')


module.exports = {
    callDiary: async(req,res)=>{
        const {id} = req.params;
        console.log(id)

        await Diary.findOne({_id: new Object(id)})
        .then((result)=>{
            if(result.length !== 0){
                console.log("데이터 잘 찾아옴!")
                console.log(result)
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
            }
            else{
                console.log("데이터 못찾아왔어요! ")
                res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
            }
        })
        .catch((e)=>{
            console.error(`[db] user create error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })


    },
    
    callAllDiary: async (req,res)=>{
       const {year,month} = req.body;
       
       
    //    var startDate = new Date(`${year}-${month}`)
    //    var endDate = new Date(`${year}-${parseInt(month)+1}`)
    //    console.log(startDate)
    //    console.log(endDate)
        
        // year, month받아와서 YYYY-mm 형식으로 맞추고 정규식으로 검색
        const date = `${year}-${month}`
        
       await Diary.find({createAt: {$regex: date}})
       .then((result)=>{
            if(result.length !== 0){
                console.log("데이터 잘 찾아옴!")
                console.log(result)
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_GET_SUCCESS,result))
            }
            else{
                console.log("데이터 못찾아왔어요! ")
                res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_GET_FAIL))
            }
       })
       .catch((e)=>{
            console.error(`[db] user create error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
       })


    },
    createDiary: async (req,res)=>{
        const {title,content} = req.body;
        console.log(title,content);
        console.log(date);
        
        
        await Diary.create({title: title, content: content, createAt: date})
        .then((result)=>{
            console.log("생성")
            res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_SAVE_SUCCESS,result))
        })
        .catch((err)=>{
            console.log("실패")
            console.error(`[db] user create error: ${err}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        
    }



}