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
        type: Date,
        required: true,
        trim: true,
      },
      diaries:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Diary"
      }],


}, {collection: 'users'});


module.exports = mongoose.model('User', userSchema);