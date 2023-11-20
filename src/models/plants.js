"use strict";
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
      plant_name: { // 식물 이름
        type: String,
        required: true,
      },
      floriography: { // 꽃말
        type: String,
        require: true
      },
      plant_desc: {
        type: String,
        require: true
      }

}, {versionKey:false}, {collection: 'plants'});

module.exports = mongoose.model('Plant', plantSchema);