"use strict";

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken
const diaryController = require('../../controllers/diary')


router.get('/',diaryController.callAllDiary)
router.get('/:id',diaryController.callDiary)


router.post('/',diaryController.createDiary)

router.put('/:id',authUtil)
router.delete('/:id',authUtil)


module.exports = router;