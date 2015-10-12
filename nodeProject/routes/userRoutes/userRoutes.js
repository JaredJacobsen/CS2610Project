var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res) {
  res.render('dashboard', {

  })
})

router.get('/profile', function(req, res) {
  res.render('profile', {

  })
})
module.exports = router
