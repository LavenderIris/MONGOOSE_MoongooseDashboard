var mongoose = require('mongoose');
var Pupper = mongoose.model('puppers');

module.exports = {
    create: function(req, res){
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
    },
    edit: function(req, res){
        Pupper.update({ _id: req.params.id }, req.body, function(err){
            if (err){
                console.log(err)
            } else {
                console.log('successful edit');
            }
        });

    },
    delete: function(req, res){
        Pupper.remove({_id: req.params.id}, function(err){
            if (err){
                console.log(err)
            } else {
                console.log('successful delete');
            }
        });

    },
    show_all: function(req, res){
        Pupper.find({},function(err, puppers) {
            if (err){
                console.log(err);
            } else {
                res.render('index', {puppers: puppers});
            }
        })
    },
    show_edit_page:  function(req, res) {
        Pupper.findOne({_id: req.params.id}, function(err, pupper) {
            if (err){
                console.log(err);
            } else {
                res.render('edit', {pupper: pupper});
            }
        });
    },
    show_one: function(req, res){
        Pupper.findOne({_id: req.params.id}, function(err, pupper) {
            if (err){
                console.log(err);
            } else {
                console.log(req.params.id, pupper)
                res.render('show', {pupper: pupper});
            }
        });
    }
}