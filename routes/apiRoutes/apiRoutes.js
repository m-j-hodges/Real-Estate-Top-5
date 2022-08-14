const router = require("express").Router()



router.get('/', async (req, res) => {
  try {
    res.render('home');  
    
  }
  catch (err) {
      res.status(500).json(err);
    }
})

router.get('/search', async (req, res) => {
try {
  res.render('search');  
}
catch (err) {
    res.status(500).json(err);
  }
})

router.get('/newuser', async (req, res) => {
try {
  res.render('newuser');  
}
catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;