var express 	= require('express')
	, exphbs		= require('express-handlebars')
	, path      = require('path')
  , port      = 3000
	, router 	= express.Router();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'auth_base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'This is a title!',
    welcome: 'Welcome to the site!'
  })
})


app.get('/profile', function(req, res) {
  res.render('profile', {
    title: 'Profile Page',
  })
})

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
