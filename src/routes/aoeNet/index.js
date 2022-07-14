const { Router } =  require('express');
const router = Router();

const matches = require('./players');
const strings = require('./strings');

router.use('/players', matches);
router.use('/', strings);

module.exports = router;