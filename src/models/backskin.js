"use strict";

const mongoose = require('mongoose');

const backSkinsSchema = new mongoose.Schema({
  skinName: {
    type: String,
    require: true,
    unique: true
  }
  
},{versionKey:false},{collection: 'backSkins'});

module.exports = mongoose.model('BackSkins', backSkinsSchema);