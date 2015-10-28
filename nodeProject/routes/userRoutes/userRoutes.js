var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
    title: 'dashboard',
    css: "/css/JaredJ.css"
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

router.get('/search', function(req, res) {
  res.render('search', {
    title: 'search',
    css: "/css/MichaelK.css"
  })
})
module.exports = router
