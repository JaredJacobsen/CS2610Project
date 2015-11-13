var express 	= require('express')
	, exphbs		= require('express-handlebars')
	, request = require('request')
  , bodyParser = require('body-parser')
	, querystring = require('querystring')
	, session = require('express-session')
	, cfg = require('./config')
	, path      = require('path')
  , port      = 3000
	, indexRoute = require('./routes/nonUserRoutes/indexRoute.js')
	, userRoutes = require('./routes/userRoutes/userRoutes.js')

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'auth_base'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  cookieName: 'session',
  secret: 'peanutButter',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/user', userRoutes);

app.get('/authorize', function(req, res) {
  var qs = {
    client_id: cfg.client_id,
    redirect_uri: cfg.redirect_uri,
    response_type: 'code'
  }

  var query = querystring.stringify(qs)

  var url = 'https://api.instagram.com/oauth/authorize/?' + query

  res.redirect(url)
})

app.get('/auth/finalize', function(req, res, next) {

	if (req.query.error == 'access_denied') {
		return res.redirect('/')
	}

  var post_data = {
    client_id: cfg.client_id,
    redirect_uri: cfg.redirect_uri,
    client_secret: cfg.client_secret,
    grant_type: 'authorization_code',
    code: req.query.code
  }

  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    form: post_data
  }

  request.post(options, function(error, response, body) {
		try {
			var data = JSON.parse(body)
		} catch (e) {
			return next(e)
		}
    req.session.access_token = data.access_token
		req.session.username = data.user.username
    //console.log(data)
    res.redirect('/user/dashboard')
  })
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', {
        message: "An error occured. Please re-login.",
				title: "Welcome to Instagram Viewer!",
        error: {},
				layout: 'base'
    });
});

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
