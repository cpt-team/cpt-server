"use strict";
const mongoose = require('mongoose');

const raiseplantSchema = new mongoose.Schema({
      save_date: { // 선택한 날짜
        type: String,
        require: true
      },
      count: { // 한 줄 일기 또는 일반 일기 횟수
        type: Number,
        require: true,
        default: 0 // 맞는지 확인
      },
      plant_state: { // 식물 상태
        type: String,
        require: true,
        default: "good"
      },
      /*
      last_date: {// 마지막으로 물 준(마지막으로 일기를 쓴 날?) 여기에 따로 저장. 유저는 이 식물 말고도 다른 식물을 키울테니까
        type: String
      },
      */
      user:{ // 키우고 있는 유저
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      plant_name: { // 식물 이름
        type: String,
        ref: "Plant"
      },
      podSkins: { // 화분
        type: String,
        ref: "PodSkins",
        default: "basicpod"
      },
      backSkins: { // 배경
        type: String,
        ref: "BackSkins",
        default: "basicback"
      },
      level: { // 성장 단계
        type: Number,
        require: true,
        default: 1
      },
      is_Activate: { // 현재 키우고 있는 식물인지?
        type: Boolean,
        require: true,
        default: true
      }

},{versionKey:false}, {collection: 'raiseplant'});

module.exports = mongoose.model('RaisePlant', raiseplantSchema);