
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

const Pupper = mongoose.model('puppers', dogSchema); // We are setting this Schema in our Models as 'User'
// Routes

// Root Request
app.get('/', function(req, res) {
    Pupper.find({},function(err, puppers) {
        if (err){
            console.log(err);
        } else {
            console.log('all dogs', puppers);
            res.render('index', {puppers: puppers});
        }
    })
    
})

// shows a pupper page
app.get('/pupper/new', function(req, res) {
    res.render('new');
})

app.get('/pupper/:id', function(req, res) {
    Pupper.findOne({_id: req.params.id}, function(err, pupper) {
        if (err){
            console.log(err);
        } else {
            console.log(req.params.id, pupper)
            res.render('show', {pupper: pupper});
        }
    });
    
})

app.get('/pupper/edit/:id', function(req, res) {
    Pupper.findOne({_id: req.params.id}, function(err, pupper) {
        if (err){
            console.log(err);
        } else {
            console.log(req.params.id, pupper)
            res.render('edit', {pupper: pupper});
        }
    });
    
})

app.post('/pupper/:id', function(req, res) {
    Pupper.update({name: req.body['name']}, {breed: req.body['breed']}, function(err){
        if (err){
            console.log(err)
        } else {
            console.log('successful edit');
        }
    });
    res.redirect('/');
})

app.post('/pupper/destroy/:id', function(req, res) {
  
    Pupper.remove({_id: req.params.id}, function(err){
        if (err){
            console.log(err)
        } else {
            console.log('successful delete');
        }
    });
    res.redirect('/');
})


app.post('/pupper', function(req, res) {    
    console.log(req.body);
    var d = new Pupper();
    d.name = req.body['name'];
    d.breed = req.body['breed'];

    d.save(function(err) {
        if(err){
            console.log(err);
        } else {
            console.log('successful save');
        }
    });
    res.redirect('/');
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
