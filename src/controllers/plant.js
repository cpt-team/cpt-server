// 가져다 쓸것들
const jwt = require('../modules/jwt');
const Plant = require('../models/plants');         // 식물
const raisePlant = require('../models/raiseplantlist')
const ObjectId = require('mongoose').Types.ObjectId // uid 형식 맞춰주는거?
const emotion = require('../controllers/emotion'); // 감정
const whether = require('../controllers/whether'); // 날씨

// 각종 알림
const responseMsg = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const plantres = require('../modules/plantresponse');

// 시간
const moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

module.exports = {
    test : async ( req, res ) => {
        const {name} = req.query;
        
        await Plant.findOne({plant_name: name})
        .then(async (result) => {
            if(result === null) { // 찾는 식물이 없을 경우
                console.log("찾는 식물이 없음")
                return res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.NO_PLANT))
            }
            if(result.plant_name === name) { // 찾는 식물이 있으면
                console.log("찾는 식물 발견")
                console.log(result)
                return res.status(200).send(plantres.successTrue(statusCode.OK, responseMsg.FIND_PLANT, [result]))
            }

        }).catch((err) => {
            console.error(err);
        })
    },

    allPlant : async ( req, res ) => { // 모든 식물 조회
        await Plant.find({})
        .then(async (result) => {
            if(result === null) { // null이거 소용없음 값 없어도 null이라고 안뜸.
                console.log("DB가 비어있음")
                return res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.NO_PLANT))
            }
            if(result !== null) {
                console.log("식물들 있음")
                // console.log(result)
                return res.status(200).send(plantres.successTrue(statusCode.OK, responseMsg.FIND_PLANT, result))
            }

        }).catch((err) => {
            console.error(err);
        })
    },

    
    plantChoice : async ( req,res ) => { // 유저가 식물을 선택했을 때
        const {uid, plantName} = req.body // 바디에서 보낸 변수 이름 그대로 맞춰줘야함;;
        var current_date = moment(new Date()).format('YYYY-MM-DD')
        /* 버튼누르면 그냥 만들어줌
        await raisePlant.create({save_date: current_date, user: uid, plant_name: plantName})
        .then(() => {
            return res.status(200).send(plantres.successTrue(statusCode.OK, responseMsg.PLANT_SAVE_SUCCESS))
        })
        .catch((err) => {
            console.log("???")
            res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.DB_ERROR))
        })
        */
        
        await raisePlant.find({user: uid, plant_name: plantName, is_Activate: true}) // 먼저 있는지 확인함. 조건: 유저id, 식물 이름, 활성화 되어있는지(키우고 있는지)
        .then(async (result) => {
        
            if(result.length === 0) { // 데이터베이스에 없으면 선택한 식물 저장함. null값 체크 하려고 해도 null을 안뱉어냄
                await raisePlant.create({save_date: current_date, user: uid, plant_name: plantName})
                .then(async () => { // 디비에 저장하고 나서 또 찾아옴
                    // res.status(200).send(plantres.successTrue(statusCode.OK, responseMsg.PLANT_CAN_SAVE))
                    console.log(responseMsg.PLANT_SAVE_SUCCESS) // 디비에 넣기 성공
                    await raisePlant.find({user: uid, plant_name: plantName, is_Activate: true}) // 데이터베이스에 넣고 저장되었는지 다시 확인
                    .then((check) => {
                        res.status(200).send(plantres.successTrue(statusCode.OK, responseMsg.PLANT_SAVE_SUCCESS, check))
                    })
                    .catch((err) => {
                        console.error(`[db] user find error: ${err}`);
                        res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.DB_ERROR))
                    })
                })
                .catch((err) => {
                    console.error(`[db] user find error: ${err}`);
                    res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.DB_ERROR))
                })
            }
            else { // 선택한 식물이 이미 데이터베이스에 있음.
                console.log("선택한 식물은 이미 키운적 있어요.")
                return res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.PLANT_SAVE_FAIL))
            }
        })
        .catch((err) => {
            console.error(`[db] user find error: ${err}`);
            res.status(200).send(plantres.successFalse(statusCode.DB_ERROR, responseMsg.DB_ERROR))
        })
        
    }
}