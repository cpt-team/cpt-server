"use strict";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  data: String,
}, {collection: 'users'});

userSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };

// Find One by todoid
userSchema.statics.findOneByUserName = function (userName) {
    return this.findOne({ userName });
  };


module.exports = mongoose.model('User', userSchema);