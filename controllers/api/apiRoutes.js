const router = require('express').Router()
const app = express()

router.get('/', (req, res) => {
  res.send('This is a get route')
})

//PORT variable
const port = process.env.PORT || 3000
router.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = router
