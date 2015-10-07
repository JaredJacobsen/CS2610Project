var express 	= require('express')
	, exphbs		= require('express-handlebars')
  , port      = 3000
	, router 	= express.Router();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.get('/profile', function(req, res) {
  res.render('profile', {
    title: 'Profile Page',
  })
})

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
