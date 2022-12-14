const router = require('express').Router();
const { application } = require('express');
const { User } = require('../models/users.js')
const session = require('express-session') 
const bcrypt = require('bcrypt')
const cors = require('cors')
const withAuth = require('../utils/auth')


let corsOptions = {
  origin: true
}

router.put('/updatePassword', withAuth, cors(corsOptions), async(req,res) => {
  try {
    console.log(req.session.id)
    const searchUser = await User.findOne({where: {email : req.body.email}})
    const comparePassword = await bcrypt.compare(req.body.password, searchUser.password)
    if(searchUser) {
      console.log(`User with matching email (${req.body.password})`)
      if(comparePassword == 1) {
         //please provide a newPassword property on the body in the fetch()
        const newPass = await bcrypt.hash(req.body.newPassword,10)
        // if there is a newPassword property on the body object, we will store it in the DB.
        if(newPass) {
          searchUser.password = newPass
          searchUser.save()
          res.status(200).json({body : searchUser, message: `Your new password has been saved.`})
          } else { res.json({message: `please provide a valid new password.`})}
        } else {res.json({message: `The password provided is not correct.`})}
      } else {res.json({message: `The email provided does not match a user in our database.`})}
  } catch (err) {console.log(err)
  res.json({message: `There was an error in updating your password.`})}})
      



router.post('/createUser', cors(corsOptions), async (req, res) => {

  try {
    const UserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isLoggedIn: req.body.isLoggedIn
    })
    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      )
    res.json({message: 'your account was successfully created', loggedIn : req.session.loggedIn})
    })
  } catch (err) {
    res.json({message: 'Your data was not saved.'})
    console.log(err)
  }
  }
  )

  router.get('/user', withAuth, async (req, res) => {
    try{
    const foundUser = await User.findAll({ where: { username: req.body.username}})
    if(foundUser) {
      console.log(foundUser)
      res.json(foundUser)
    } else {
      res.json({message: `user with given ${req.body.username} not found.`})
    }
  } catch (err) { console.log(err)
  res.json(`There was the following error with processing your request ${err}.`)
  }

  })
router.get('/login', (req,res) => {
 if(req.session.id) {
  res.render('search', {loggedIn : req.session.loggedIn})
 }
  res.render('login', {loggedIn : req.session.loggedIn}) //handlebars page with login partial.
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
      res.json({body: queryUser, loggedIn : req.session.loggedIn})
      })
      
        } else {
          console.log(`There was an error logging you in with the current credentials.`)
          return
        }
      } catch (err) {
          res.json({message: "your request to login could not be completed."})
          console.log(err)
        }

      
})

router.post('/logout', (req,res) => {
  if(req.session.id) {
    console.log(`received request to destroy session with id ${req.session.id}`)
    req.session.destroy(() => {
      console.log(`The current session was destroyed`)
    res.json({message: 'Your session has been destroyed.'}) //Place link to future handlebars logout screen here.
    })
  } else {res.json({message: 'You could not be logged out due to an error.'})
console.log(err)
}

})

router.delete('/deleteUser', withAuth, async (req,res) => {
  try{
  if(req.session.id) {
  const searchUser = req.body.email
  const queryUser = await User.findOne({ where: { email : searchUser}})
  if(queryUser) {
  const deleteUser = await User.destroy({where: { email : queryUser.email}})
  if( deleteUser == 1 ){
    res.status(200).json({message: `The user with id ${queryUser.username} was deleted.`})
  }
  }}
  else {res.json({message: 'Please login first.'})}
} catch (err) { 
  res.json({message: "There was an error processing your request."})
  console.log(err)}}
)


router.get('/', async (req, res) => {
  try {
    res.render('login', {loggedIn : req.session.loggedIn});  
    
  }
  catch (err) {
      res.status(500).json(err);
    }
})

router.get('/search', withAuth, async (req, res) => {
try {
  res.render('search', {loggedIn : req.session.loggedIn});  
}
catch (err) {
    res.status(500).json(err);
  }
})

router.get('/createUser', async (req, res) => {
try {
  res.render('createUser', {loggedIn : req.session.loggedIn});  
}
catch (err) {
    res.status(500).json(err);
  }
})

router.get('/logout', withAuth, async (req, res) => {
  try {
    res.render('logout', {loggedIn : req.session.loggedIn});  
  }
  catch (err) {
      res.status(500).json(err);
    }
  })



 


  module.exports = router;
  