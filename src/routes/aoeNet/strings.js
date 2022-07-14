const { Router } =  require('express');
const router = Router();
const { aoeNet } = require('../../controllers');

const { strings } = aoeNet;

router.use('*', (req, res, next) => {
  console.log('/strings');
  next();
});

router.get('/strings', strings.getStrings);

module.exports = router;