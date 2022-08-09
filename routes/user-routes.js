const router = require('express').Router();
const { application } = require('express');
const { User } = require('../models/users.js')


router.post('/createUser', async (req, res) => {

  try {
    const UserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isLoggedIn: req.body.isLoggedIn
    }) 
    res.json({message:"your user data was saved."})
  
  } catch (err) {
    res.json({message: 'Your data was not saved.'})
    console.log(err)
  }
  }
  )

  router.get('/User', async (req, res) => {
    const foundUser = await User.findAll({ where: { username: req.body.username}})
    if(foundUser) {
      console.log(foundUser)
      res.json(foundUser)
    } else {
      res.json({message: `user with given ${req.body.username} not found.`})
    }

  })



  module.exports = router;
  