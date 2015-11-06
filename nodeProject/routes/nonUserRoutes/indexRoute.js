var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

  res.render('index', {
    layout: 'base',
    title: 'Welcome to Instagram Viewer!',
    welcome: 'This website works side-by-side with Instragram to make it easier to view your profile, favorite searches, and dashboard. If you don\'t have an Instagram account, hit "sign up" below, and you will be redirected to Instagram to create an account.'
  })
})


module.exports = router
