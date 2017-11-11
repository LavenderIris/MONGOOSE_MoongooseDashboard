var mongoose = require('mongoose');
var Pupper = mongoose.model('puppers');
var puppers = require('../controllers/puppers.js');

module.exports = function(app){

// Root Request
app.get('/', function(req, res) {
    puppers.show_all(req, res);  
})

app.get('/pupper/new', function(req, res) {
    res.render('new');
})

app.get('/pupper/:id', function(req, res) {
    puppers.show_one(req, res);
})

app.get('/pupper/edit/:id', function(req, res) {
   puppers.show_edit_page(req, res);
})

app.post('/pupper/:id', function(req, res) {
    puppers.edit(req, res);
    res.redirect('/');
})

app.post('/pupper/destroy/:id', function(req, res) {
    puppers.delete(req, res);
    res.redirect('/');
})

//create
app.post('/pupper', function(req, res) {    
    puppers.create(req, res)
    res.redirect('/');
})
}