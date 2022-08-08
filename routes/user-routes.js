const router = require('express').Router();
const { User } = require('../models/users.js')


router.post('/createUser', async (req, res) => {

  try {
    const UserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isLoggedIn: req.body.isLoggedIn
    }) 
    res.render('../views/index.html')
  
  } catch (err) {
    res.json({message: 'Your data was not saved.'})
    console.log(err)
  }
  }
  
  )

  module.exports = router;
  