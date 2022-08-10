const router = require('express').Router();
const { application } = require('express');
const { User } = require('../models/users.js')
const session = require('express-session') 
const bcrypt = require('bcrypt')



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
router.get('/login', async (req,res) => {
  res.render('../views/login.html') //insert handlebars

}
  
)
router.post('/login/', async (req,res) => {
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
        )}
        )
      res.json({message:`you're now logged in for 30 minutes as ${req.body.username}.`, body: queryUser, isLoggedIn: true})
        }}
        catch (err) {
          res.json({message: "your request to login could not be completed."})
          console.log(err)
        }

        

})


async function resetLoggedIn(userData) {
 
  const userResult = await User.findOne({where:{ email : userData.email}});
 userResult.isLoggedIn = 0;
 userResult.save()

}

  module.exports = router;
  