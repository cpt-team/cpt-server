"use strict";

const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.use('/auth', require('./auth'));
router.use('/diary', require('./diary/diary'));
router.use('/plant', require('./plant'));
router.use('/user', require('./user'));

module.exports = router;






router.get('/login', async(req, res) => {
   
    await User.findOne({email:'comet1010@naver.com'})
    .then((user)=>{
        console.log(user);
        if(!user) return res.status(404).send({ err: 'User not found' });
       
    })
    
    
});
/*
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
*/
