"use strict";

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken
const diaryController = require('../../controllers/diary')


router.get('/', diaryController.callAllDiary)
router.post('/',diaryController.createDiary)

router.get('/diarys',diaryController.callDiary)
router.put('/',diaryController.updateDiary)
router.delete('/',diaryController.deleteDiary)



module.exports = router;