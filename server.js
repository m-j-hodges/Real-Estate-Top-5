const express = require('express');
const routes = require('./routes');;
const sequelize = require('./config/connection');
const User = require('./models/users');
const { Router } = require('express');
const { Utils } = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes)


//simple seed to ensure Sequelize is working.
app.post('/', async (req,res) => {
const newUser = await User.create({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
  isLoggedIn: req.body.isLoggedIn
})
if (newUser) {
  console.log(newUser)
  res.json({message: 'request received.'})
} else {res.status(500).json({message: 'error on server.'})}
}
)


// run sequelize
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
