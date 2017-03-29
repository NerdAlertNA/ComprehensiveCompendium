var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var methodOverride = require('method-override');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

app.set('view engine', 'hbs');
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var usersController = require("./controllers/usersController.js");
var componentController = require("./controllers/componentController");
app.use('/users', usersController);
app.use('/components', componentController);

mongoose.connect('mongodb://heroku_1hsslwq7:mo855ii9gifs5gn9fq8q74qrqq@ds043942.mlab.com:43942/heroku_1hsslwq7');

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

app.listen(process.env.MONGODB_URI, function(){
  console.log("Comprehensive Compendium collecting information");
});

