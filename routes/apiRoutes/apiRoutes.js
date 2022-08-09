const { Router } = require('express')

Router.get('/', withAuth, async (req, res) => {
  res.json({ message: 'this works' })
})

module.exports = router
