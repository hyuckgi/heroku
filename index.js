var cool = require('cool-ascii-faces');
var express = require('express');
var mongoose = require('mongoose');

var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

// mongoose.connect(process.env.MONGODB_URI);
var mongodbUri = 'mongodb://gadokkwon:sksmsskdi9232@ds133670.mlab.com:33670/heroku_72r92033';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
  console.log("hello mongodb");
});

// // define model
var Books = require('./models/books');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

app.get('/books', function(req, res) {
    res.json({success: true})
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
