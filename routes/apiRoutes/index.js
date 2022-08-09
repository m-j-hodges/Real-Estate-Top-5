const router = require('express').Router();

const apiRouting = require('./apiRoutes')

router.use('/', apiRouting)

modules.export = router;