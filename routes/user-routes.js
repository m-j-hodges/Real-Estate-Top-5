const router = require('express').Router();
const { application } = require('express');
const { User } = require('../models/users.js')
const session = require('express-session') 
const bcrypt = require('bcrypt')
const cors = require('cors')

let corsOptions = {
  origin: true
}

router.post('/createUser', cors(corsOptions), async (req, res) => {

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

  router.get('/user', async (req, res) => {
    const foundUser = await User.findAll({ where: { username: req.body.username}})
    if(foundUser) {
      console.log(foundUser)
      res.json(foundUser)
    } else {
      res.json({message: `user with given ${req.body.username} not found.`})
    }

  })
router.get('/login', async (req,res) => {
  if(req.session.loggedIn) {
  res.redirect('/')
  return;
  }
  res.render('login')
}
)
router.post('/login', cors(corsOptions), async (req,res) => {
  try{
    const currentUserPassword = req.body.password
    const queryUser = await User.findOne({where: {email : req.body.email}})
    const bcryptCompare = await bcrypt.compare(currentUserPassword, queryUser.password)
    if (bcryptCompare == 1) {
      req.body.isLoggedIn = true;
      queryUser.isLoggedIn = true;
      queryUser.save();
      req.session.save(() => {
        req.session.loggedIn = true;
        console.log(
          '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
          req.session.cookie
        )
      
      res.status(200).json({user: queryUser, message: 'You are now logged in!'})})
        }} catch (err) {
          res.json({message: "your request to login could not be completed."})
          console.log(err)
        }

      
})

router.post('/logout', (req,res) => {
  if(req.session.loggedIn) {
    console.log(`received request to destroy session with id ${req.session.id}`)
    req.session.destroy(() => {
      console.log(`The current session was destroyed`)
    res.render('../views/logout.html') //Place link to future handlebars logout screen here.
    })
     

  } else {res.json({message: 'You could not be logged out due to an error.'})
console.log(err)
}

})


async function resetLoggedIn(userData) {
 
  const userResult = await User.findOne({where:{ email : userData.email}});
 userResult.isLoggedIn = 0;
 userResult.save()

}

  module.exports = router;
  