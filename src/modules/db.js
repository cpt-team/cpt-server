"use strict";

require('dotenv').config()

const mongoose = require('mongoose');

module.exports = () => {
  async function connect() {
  await mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('db start');
    //console.log(process.env.DB_URL+'/cpt-dev')
  })
  .catch(err => {
    console.log('db error');
    console.log(err);
   })
  }


connect();
mongoose.connection.on('disconnected', connect);
};


