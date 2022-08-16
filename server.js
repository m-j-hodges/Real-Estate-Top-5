const express = require('express');
const routes = require('./routes');;
const sequelize = require('./config/connection');
const User = require('./models/users');
const { Router } = require('express');
const { Utils } = require('./config/connection');
const router = require('express').Router();
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;
;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(cors())
app.options('*', cors())
app.use(cookieParser());
app.use(bodyParser.json());

let corsOptions = {
  origin: true
}

const sess = {
  secret: `${process.env.secret_var}`,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30*60*1000,
    isLoggedIn: false,
  },
  store: new SequelizeStore({
    db: sequelize,
  })
};
app.use(session(sess));




//simple seed to ensure Sequelize is working.
// app.post('/', async (req,res) => {
// const newUser = await User.create({
//   username: req.body.username,
//   email: req.body.email,
//   password: req.body.password,
//   isLoggedIn: req.body.isLoggedIn
// })
// if (newUser) {
//   console.log(newUser)
//   res.json({message: 'request received.'})
// } else {res.status(500).json({message: 'error on server.'})}
// }
// )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(routes)
// run sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
