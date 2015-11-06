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

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
