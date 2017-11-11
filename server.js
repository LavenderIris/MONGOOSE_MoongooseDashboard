
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
app.set('views', path.join(__dirname, './views'));
// app.set('views', path.join(__dirname, './static'));
app.set('view engine', 'ejs');

// mongoose set up
app.use( express.static( "./static" ) );
mongoose.connect('mongodb://localhost/basic_mongoose');
var dogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    breed: {type: String, required: true}
})

var Pupper = mongoose.model('puppers', dogSchema);
 // We are setting this Schema in our Models as 'User'
// Routes
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
