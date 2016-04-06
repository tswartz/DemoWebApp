var express = require('express');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, response) {
	request('http://api.openweathermap.org/data/2.5/weather?id=4930956&APPID=' + process.env.API_KEY, function(error, resp, body) {
		response.render('pages/index', {body: body});
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


