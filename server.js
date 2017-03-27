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
app.use('/users', usersController);

mongoose.connect('mongodb://localhost/comprehensive-compendium');

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

app.listen(3000, function(){
  console.log("Comprehensive Compendium collecting information on port 3000!");
});

