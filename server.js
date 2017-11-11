
var express = require('express');
var path = require('path');

var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use( express.static( "./client/static" ) );
app.set('views', path.join(__dirname, './client/views'));
// app.set('views', path.join(__dirname, './static'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');

 // We are setting this Schema in our Models as 'User'
// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
