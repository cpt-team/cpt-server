const Diary = require('../models/diary')
const User = require('../models/user')

const responseMsg = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/resultUtils')
const ObjectId = require('mongoose').Types.ObjectId


// KST 설정완료
const moment = require('moment-timezone')
const { JsonWebTokenError } = require('jsonwebtoken')
moment.tz.setDefault("Asia/Seoul")
var date = moment().format('YYYY-MM-DD HH:mm:ss')


module.exports = {
    callDiary: async(req,res)=>{

        // diary_id
        const {id} = req.params;

        try{
            const idx = new ObjectId(id)
            console.log(idx)

            await Diary.findOne({_id: idx})
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

        }
        catch{
            console.log("ObjectId값이 아닙니다.")
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
            }
    },
    
    callAllDiary: async (req,res)=>{
        const {uid,year,month} = req.body;

        console.log(uid)
        const date = `${year}-${month}`

        // User가 작성한 diary 전체 출력 diaries만 출력
        // await User.find({_id : new ObjectId(uid)},{uid: 0 ,_id : 0,email: 0 ,pw:0,name:0,birth:0}).populate("diaries")
        // .then((result)=>{
        //     res.json(result)
        // })


            // 전체 유저의... 데이터 값 찾기 쓰면 안댐..
        await Diary.find({createAt: {$regex: date},user:{_id:uid}})
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
        var date = moment().format('YYYY-MM-DD HH:mm:ss')
        const {uid,title,content} = req.body;
        console.log(title,content);
        console.log(date);

        // user _id
        console.log(uid);
        
        await Diary.create({user:uid,title: title, content: content, createAt: date})
        .then(async (result)=>{
            res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_SAVE_SUCCESS,result))
            //user 데이터의 diaries 배열에 생성한 diary ObjectId 값 추가
           const Did = new ObjectId(await Diary.findOne({user:uid,createAt:date},{_id:1}))
           await User.updateOne({_id:uid},{$push:{diaries: Did}})
        })
        .catch((err)=>{
            console.log("실패")
            console.error(`[db] user create error: ${err}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })

        


        

        
    },
    updateDiary: async(req,res)=>{
        const {title, content} = req.body;
        // 동적라우팅으로 선택한 diary의 ObjectId값을 /diary/{ObjectId}
        const {id} = req.params

        try{
            const idx = new ObjectId(id)
            console.log(idx)

            await Diary.updateOne({_id: idx},{$set: {title: title, content: content}})
            .then((result)=>{
                console.log("수정완료")
                res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_UPDATE_SUCCESS))
            })
            .catch((e)=>{
                console.error(`[db] user create error: ${e}`);
                res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
            })
        }
        catch{
            console.log("ObjectId값이 아닙니다.")
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
        }


    },

    deleteDiary: async(req,res)=>{


        // user _id값
        const {uid} = req.body;

        // diary _id값
        const {id} = req.params;


        try{
        // user 데이터의 diaries 배열에 생성한 diary ObjectId 값 추가
        const Did = new ObjectId(id)
        await User.updateOne({_id:uid},{$pull:{diaries: Did}})
        .then((result)=>{
            console.log(Did)
            console.log("잘 삭제 되었어요?")
            console.log(result)
        })
        .catch((e)=>{
            console.error(e)
        })
        
        const idx = new ObjectId(id)
        console.log(idx)

        await Diary.deleteOne({_id: idx})
        .then((result)=>{
            console.log("삭제완료")
            res.status(200).send(util.successTrue(statusCode.OK,responseMsg.DIARY_DELETE_SUCCESS))
        })
        .catch((e)=>{
            console.error(`[db] user create error: ${e}`);
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,responseMsg.DB_ERROR))
        })
        
    }
    catch{
            console.log("ObjectId값이 아닙니다.")
            res.status(200).send(util.successFalse(statusCode.OK,responseMsg.DIARY_OBJECTID_IS_NOT_EQUAL))
        }
    
    }
    



}