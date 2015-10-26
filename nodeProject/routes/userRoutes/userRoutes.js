var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title: 'Welcome to the dashboard',
    css: "/css/style.css"
  })
})

router.get('/profile', function(req, res) {
  res.render('profile', {
    title: "User Profile"
  })
})

router.get('/savedSearches', function(req, res) {
  res.render('savedSearches', {
    title: "Saved Searches"
  })
})
module.exports = router
