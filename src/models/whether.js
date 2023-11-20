"use strict";

const mongoose = require('mongoose');

const whetherSchema = new mongoose.Schema({
      whethers : {
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
  

},{versionKey:false},{collection: 'whethers'});


module.exports = mongoose.model('Whether', whetherSchema);