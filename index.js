var express = require('express');
var pg = require('pg');
var app = express();




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL,function(err, client) {
    if(err) throw err;
    console.log("Connected to postgres! Getting schemas");

    client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
        console.log(JSON.stringify(row));
    });
})

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
