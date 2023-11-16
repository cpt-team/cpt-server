"use strict";

const mongoose = require('mongoose');
const AutoIncreasement = require('mongoose-sequence')(mongoose)



const diarySchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createAt:{
        type: String,
        required: true
      },
      emotion:{
        type: String
      },
      whether:{
        type: String
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      /*
      hashTags: [{
        type: String,
        trim: true,
      }],
      
      emotion: {
        type: Array,
        required: true
      },
      whether: {
        type: Array,
        required: true
      },
      music: {
        type: Array,
        required: true
      },
      */


},{versionKey: false},{collection: 'diaries'});

//.plugin(AutoIncreasement,{inc_field:"diaryIdx"});
// ,{timestamps: true}

module.exports = mongoose.model('Diary', diarySchema);