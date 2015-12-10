// server.js

// Setup
//====================================================

// initialize the packages required. 
var express = require('express'),
  bodyParser = require('body-parser'),
  assert = require('assert'),
  mongoose = require('mongoose');

var app = express(); // initialize express

// connect to our local MongoDb
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/cities';
// MongoClient.connect(url, function (err, db) {
//  assert.equal(null, err);
//  console.log("Connected correctly to server.");
//  //db.close();
// });

// connecting to MongoLab
var url = 'mongodb://za:za123$@ds061984.mongolab.com:61984/cities';
mongoose.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  //db.close();
});

//configure app to use body parser to get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//set up the port to run express
var port = process.env.PORT || 8080

// Define Routing 
//==========================================================

var router = express.Router();
//
//middleware to use for all requests
router.use(function (req, res, next) {
  console.log("Route middleware set.");
  next();
})

// test the routing 
router.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the api world'
  })
});

var City = require('./app/models/city');
cityRouter = require('./app/routes/cityRoutes')(City);

//Register all routes to prefix with '/api'
//=== === === === === === === === === === === === === === === === === =
app.use('/api', router);
app.use('/api/cities', cityRouter);

//Start the server
//=== === === === === === === === === === === === === === === === =
app.listen(port);
console.log("Gulp is running the App on Port : " + port);