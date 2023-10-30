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



userSchema.statics.findAll = function () {
    // return promise
    // V4���� exec() �ʿ����
    return this.find({});
};

// Find One by email (�ߺ��˻� �ؾߵ� - �̸���)
userSchema.statics.findOneByUserEmail = function (userEmail) {
    return this.findOne({ email : userEmail });
};


module.exports = mongoose.model('User', userSchema);