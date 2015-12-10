// app/models/cities.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CitySchema   = new Schema({
    name: String,
    country: String
});

module.exports = mongoose.model('City', CitySchema);