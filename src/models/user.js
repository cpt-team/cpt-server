"use strict";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
      },
      pw: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      birth: {
        type: Date,
        required: true
      }


}, {collection: 'users'});


module.exports = mongoose.model('User', userSchema);