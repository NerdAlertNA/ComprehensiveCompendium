var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comprehensive-compendium');

var User = require('../models/user');
var Component = require('../models/component');

mongoose.Promise = global.Promise;

Component.remove({}, function(err){
	console.log(err);
});

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

var componentExample = new Component({
	title: 'A test compenent',
	content: 'This is a test post these posts will be called components due to the name of the site'
});

var componentTest = new Component({
	title: 'Test',
	content: 'content'
});

var componentSuccess = new Component({
	title: 'This is where the title goes!',
	content: 'This is where the content goes!'
});

var users = [jacob, geralt, noob];
var components = [componentExample, componentTest, componentSuccess];


components.forEach(function(component, i){
	component.save(function(err) {
		if(err) { console.log(err); }

		console.log(component)
	});
});


users.forEach(function(user, i){
	user.components.push(components[i]);

	user.save(function(err) {
		if(err) { console.log(err); }

		console.log(user);
	});
});

