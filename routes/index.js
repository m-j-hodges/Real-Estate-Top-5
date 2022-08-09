const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const apiRoutes = require('./apiRoutes')

router.use('/', userRoutes)
router.use('/api', apiRoutes)

module.exports = router;