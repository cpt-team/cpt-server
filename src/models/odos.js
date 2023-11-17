"use strict";

const mongoose = require('mongoose');
const AutoIncreasement = require('mongoose-sequence')(mongoose)



const odosSchema = new mongoose.Schema({
      
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
      }
      


},{versionKey: false},{collection: 'odos'});

//.plugin(AutoIncreasement,{inc_field:"diaryIdx"});
// ,{timestamps: true}

module.exports = mongoose.model('Odos', odosSchema);