const router = require('express').Router();

// const apiRoutes = require('./api');
const userRoutes = require('./user-routes.js');

router.use('/', userRoutes);
// router.use('/api',apiRoutes)


module.exports = router;