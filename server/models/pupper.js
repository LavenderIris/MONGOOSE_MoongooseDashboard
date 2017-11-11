var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    breed: {type: String, required: true}
})

var Pupper = mongoose.model('puppers', dogSchema);