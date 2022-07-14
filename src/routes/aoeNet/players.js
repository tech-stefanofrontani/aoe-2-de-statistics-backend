const { Router } =  require('express');
const router = Router();
const { aoeNet } = require('../../controllers');

const { players } = aoeNet;

router.use('*', (req, res, next) => {
  console.log('/players');
  next();
});

router.get('/matches', players.getMatchesByPlayer);

module.exports = router;