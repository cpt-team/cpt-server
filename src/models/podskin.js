"use strict";
const mongoose = require('mongoose');
const podSkinsSchema = new mongoose.Schema({
      skinName: {
        type: String,
        require: true,
        unique: true
      }
      
}, {versionKey:false}, {collection: 'podSkins'});


module.exports = mongoose.model('PodSkins', podSkinsSchema);