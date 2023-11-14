const User = require('../models/user')
const Whether = require('../models/whether')

const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    setDefaultWhether: async (uid) =>{
        console.log("이모지 가져오기 위한 uid: "+ uid)
        console.log("바꾼 값: " + new ObjectId(uid))
        console.log("바꾼 값: " + new Object(uid))
        var myWhether = [
            {name: "sunny",isActive: true},
            {name: "windy",isActive: true},
            {name: "cloudy",isActive: true},
            {name: "rainy",isActive: true},
            {name: "snowy",isActive: true},
            {name:"sunnyCloudy",isActive:true}

        ];


        // 이모지 첫 초기화
        await Whether.insertMany({whethers: myWhether,user: uid})
        .then((result)=>{
            console.log("whether 초기화 성공")
            
        })
        .catch((e)=>{
            console.error("whether 초기화 실패 "+ e)
        })


        // user의 whether값에 whether _id값을 넣어줌으로서 조인기능 사용
        const id = await Whether.findOne({user: uid},{_id:1})
        

        // await User.updateOne({_id:uid},{$push:{diaries: Did}})
        await User.updateOne({_id:uid},{$push:{whethers: id}})
        .then(()=>{
            //console.log("user에 업데이트 잘됨.")
        })
        .catch((e)=>{
            console.error("user에 whether값 잘 안들어감 "+ e)
        })

        
        // 결과 출력해보기
        /*
        await Whether.findOne({user:uid}).then((result)=>{
            console.log("결과")
            console.log(result)
        })
        */
        

        

    
    }


}