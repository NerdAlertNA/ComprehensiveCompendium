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

var noob = new User({
	username: 'test',
	first_name: 'passed',
	password: 'failed'
});

var users = [jacob, geralt, noob];


// jacob.save(function(err) {
// 		if(err) { console.log(err); }

// 		console.log('user');
// 	});


users.forEach(function(user){
	user.save(function(err) {
		if(err) { console.log(err); }

		console.log(user);
	});
});

