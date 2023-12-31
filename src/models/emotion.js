"use strict";

const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
      emotions : {
        type: Array,
        properties:{
          name: {
            type: String
          },
          isActive:{
            type:Boolean
          }
        }
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
  

},{versionKey:false},{collection: 'emotions'});


module.exports = mongoose.model('Emotion', emotionSchema);