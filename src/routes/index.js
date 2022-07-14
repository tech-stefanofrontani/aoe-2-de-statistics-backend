const { Router } =  require('express')
const router = Router()
const aoeNet = require('./aoeNet');

router.use('/aoeNet', aoeNet);

module.exports = router;