var express = require('express');
var bodyParser = require('body-parser');
var app = express();



app.use(express.static(__dirname + '/client/'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.listen(8000, function(){
	console.log('MAJOR TOM');
});