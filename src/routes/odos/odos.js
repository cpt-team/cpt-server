"use strict";

let express = require('express');
let router = express.Router();
const authUtil = require('../../middleware/auth').checkToken
const odosController = require('../../controllers/odos')


router.get('/', odosController.callAllOdos)
router.post('/',odosController.createOdos)




module.exports = router;