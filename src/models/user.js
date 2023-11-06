"use strict";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      pw: {
        type: String,
        trim: true,
        required: true
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      birth: {
        type: String,
        required: true,
      },
      diaries:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Diary"
      }],
      emotions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Emotion"
      }],
      whethers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Whether"
      }]


},{versionKey:false},{collection: 'users'});


module.exports = mongoose.model('User', userSchema);