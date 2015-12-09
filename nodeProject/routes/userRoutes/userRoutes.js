var express = require('express');
var request = require('request');
var Users = require('../../models/users')
var router = express.Router();

router.get('/dashboard', function(req, res, next) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token
  }

  request.get(options, function(error, response, body) {
    try {
      var feed = JSON.parse(body)
      if (feed.meta.code > 200) {
        return next(feed.meta.error_message);
      }
    }
    catch(e) {
      return next(e)
    }
    //console.log(feed.data)
    res.render('dashboard', {
      feed: feed.data,
      title: 'dashboard',
      css: "/css/JaredJ.css",
      user: req.session.username
    })
  })
})

router.get('/profile', function(req, res, next) {

    if(req.session.userId){
    //Find user
    Users.find(req.session.userId, function(document) {
      if(!document) return res.redirect('/')
      res.render('profile', {
        users: document,
        css: "/css/jeannemunk.css",
        user: document.username
      })
    })
    }else {
    res.redirect('/profile')
  }
})

router.post('/profile', function (req, res) {
  var user = req.body
    //update the user
    Users.update(user, function(){
      //Render the Update
      res.render('profile', {
        users: user,
        user: user.username,
        success: 'Sucessfully updated the user!',
        css: "/css/jeannemunk.css",
      })
    })
})

router.get('/search', function(req, res) {
  res.render('search', {
    css: "/css/MichaelK.css",
    user: req.session.username,
    search: "search",
    saveButtonType: "hidden"
  })
})

router.post('/search', function(req, res, next){
  var search = req.body

  var options = {
    url: 'https://api.instagram.com/v1/tags/'+ search.search + '/media/recent?access_token=' + req.session.access_token
    //url: 'https://api.instagram.com/v1/tags/search?q=' + search.search + '&access_token=' + req.session.access_token
  }
  request.get(options, function(error, response, body){
    if (body[0] != "{") {
      res.render('search', {
        noResults: "No Results",
        css: "/css/MichaelK.css",
        user: req.session.username,
        search: search.search,
        saveButtonType: "hidden"
      })
    }
    else {
      try {
        var results = JSON.parse(body)
        if (results.meta.code > 200) {
          return next(results.meta.error_message);
        }
      }
      catch(e) {
        return next(e)
      }
      res.render('search', {
        result: results.data,
        css: "/css/MichaelK.css",
        user: req.session.username,
        search: search.search,
        saveButtonType: "submit"
      })
      //console.log(results)
    }
  })

})

//Breaks program if not logged in and accessing savedSearches directly
router.get('/savedSearches', function(req, res) {
  Users.find(req.session.userId, function(document) {
    res.render('savedSearches', {
      title: "Saved Searches",
      css: "/css/MichaelK.css",
      user: req.session.username,
      searches: document.tags
    })
  })
})

router.post('/savedSearches', function(req, res) {
  Users.addTag(req.session.userId, req.body.save, function() {
    Users.find(req.session.userId, function(document) {
      res.render('savedSearches', {
        title: "Saved Searches",
        css: "/css/MichaelK.css",
        user: req.session.username,
        searches: document.tags
      })
    })
  })
})

router.post('/removeTag', function(req, res) {
  console.log(req.body)
  Users.removeTag(req.session.userId, req.body.removeTag, function() {
    Users.find(req.session.userId, function(document) {
      res.render('savedSearches', {
        title: "Saved Searches",
        css: "/css/MichaelK.css",
        user: req.session.username,
        searches: document.tags
      })
    })
  })
})

module.exports = router
