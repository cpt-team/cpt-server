"use strict";

const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.get('/', (req, res) => {
    return res.send("홈 페이지");
});


router.get('/login', async(req, res) => {
   
    await User.findOne({name:'comet'})
    .then((user)=>{
        return res.send(user);
        if(!user) return res.status(404).send({ err: 'User not found' });
       
    })
    
    
});

router.get('/log', (req, res, next) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      })
  });

router.get('/:name', (req, res) => {
    User.findOneByUserName(req.params.userName)
    .then((user) => {
      if (!user) return res.status(404).send({ err: 'User not found' });
      res.send(`findOne successfully: ${user}`);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;