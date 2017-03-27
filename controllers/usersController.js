var express = require('express');
var router = express.Router();

var User = require("../models/user");


// users index route
router.get('/', function(req, res){
  User.find({})
    .exec(function(err, users){
      if (err) { console.log(err); }
      console.log(users);
      res.render('users/index.hbs', {
        users: users
      });
    });
});


// new user creation route
router.get('/new', function(req, res) {
	res.render('users/new.hbs')
});

router.post('/', function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});
	user.save(function(err, user){
		if (err) {console.log(err); }
		console.log(user);
		res.redirect('/users')
	});
});

// show individual user route
router.get('/:id', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user) {
		if (err) { console.log(err); }
		console.log(user);
		res.render('users/show.hbs', {
			user: user
		});
	});
});

// delete user route
router.delete('/:id', function(req, res){
	User.findByIdAndRemove(req.params.id)
	.exec(function(err, user) {
		if (err) { console.log(err); }
		console.log('User deleted');
		res.redirect('/users');
	});
});

// edit existing user route
router.get('/:id/edit', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user) {
		if (err) { console.log(err); }
		res.render('users/edit', {
			user: user
		});
	});
});

module.exports = router;