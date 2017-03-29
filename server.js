var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var methodOverride = require('method-override');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var usersController = require("./controllers/usersController.js");
var componentController = require("./controllers/componentController");
app.use('/users', usersController);
app.use('/components', componentController);

mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});

db.once('open', function() {
  console.log("database has been connected!");
});

app.listen(port, function(){
  console.log("Comprehensive Compendium collecting information");
});

