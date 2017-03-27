var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comprehensive-compendium');

var User = require('../models/user');

mongoose.Promise = global.Promise;

User.remove({}, function(err){
  console.log(err);
});

var jacob = new User({
	username: 'NerdAlert',
	first_name: 'Jacob',
	password: '123456789'
});

var geralt = new User({
	username: 'geraltOfRivia',
	first_name: 'Geralt',
	password: 'rivia'
});

var test = new User({
	username: 'test',
	first_name: 'passed',
	password: 'failed'
});

var users = [jacob, geralt, test];

console.log(users);