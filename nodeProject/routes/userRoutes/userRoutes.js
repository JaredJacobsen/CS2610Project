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
    title: "User Profile",
    username: "[USERNAME]"
  })
})

router.post('/profile', function (req, res) {
  var form = req.body
  if(form.userName == 'jeannemunk'){
    res.render('profile', {
      username: form.userName
    })
  }else{
    res.render('profile', {
      error: 'Incorrect login details'
    })
  }
})

router.get('/search', function(req, res) {
  res.render('search')
})

router.get('/savedSearches', function(req, res) {
  res.render('savedSearches', {
    title: "Saved Searches"
  })
})

module.exports = router
