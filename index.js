var cool = require('cool-ascii-faces');
var express = require('express');
var mongoose = require('mongoose');

var app = express();


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);

// define model
var Books = require('./models/books');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

app.get('/books', function(req, res) {
    Books.find(function(err, books) {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
