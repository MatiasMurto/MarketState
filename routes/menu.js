var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.render('menu', { title: 'Express' });
});

module.exports = router;
