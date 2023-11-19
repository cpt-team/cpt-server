const User = require('../models/user')
const Emotion = require('../models/emotion')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    setDefaultEmotion: async (uid) =>{
        console.log("이모지 가져오기 위한 uid: "+ uid)
        console.log("바꾼 값: " + new ObjectId(uid))
        console.log("바꾼 값: " + new Object(uid))
        var myEmotion = [
            {name: "sad",isActive: true},
            {name: "happy",isActive: true},
            {name: "fine",isActive: true},
            {name: "good",isActive: true},
            {name: "love",isActive: true},
            {name: "angry",isActive:true},
            {name: "sleepy",isActive:true},
        ];

        // 이모지 첫 초기화
        await Emotion.insertMany({emotions: myEmotion,user: uid})
        .then((result)=>{
            console.log("emotion 초기화 성공")
            
        })
        .catch((e)=>{
            console.error("emotion 초기화 실패 "+ e)
        })

        const id = await Emotion.findOne({user: uid},{_id:1})

        // await User.updateOne({_id:uid},{$push:{diaries: Did}})
        await User.updateOne({_id:uid},{$push:{emotions: id}})
        .then(()=>{
            //console.log("user에 업데이트 잘됨.")
        })
        .catch((e)=>{
            console.error("user에 emotion값 잘 안들어감 "+ e)
        })
        // 결과 출력해보기
        /*
        await Emotion.findOne({user:uid}).then((result)=>{
            console.log("결과")
            console.log(result)
        })
        */
    }
}