//    plant/plants.js
"use strict"

let express = require('express');
let router = express.Router();
// const authUtil = require('../../middleware/auth').checkToken
const plantcontroller = require('../../controllers/plant')

// router.get('/:name', plantcontroller.test);

router.get('/', plantcontroller.allPlant); // 식물 선택화면에 뿌려줄 때
router.post('/', plantcontroller.plantChoice); // 식물 선택화면에서 선택했을 때
// 식물 탭에 뿌려줄 때
// 화분 탭에 뿌려줄 때
// 화분 탭에서 화분을 변경했을 때
// 배경 탭에 뿌려줄 때
// 배경 탭에서 배경을 변경했을 때
// 

module.exports = router;