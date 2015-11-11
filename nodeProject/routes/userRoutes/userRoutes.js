var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/dashboard', function(req, res) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token
  }

  request.get(options, function(error, response, body) {
    var feed = JSON.parse(body)
    console.log(feed.data)
    res.render('dashboard', {
      feed: feed.data,
      title: 'dashboard',
      css: "/css/JaredJ.css",
      user: req.session.username
    })
  })
})

router.get('/profile', function(req, res) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.session.access_token
  }

 request.get(options, function(error, response, body) {
    var user = JSON.parse(body)
    res.render('profile', {
      title: "User Profile",
      user: user.data,
      css: "/css/jeannemunk.css",

    })
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
