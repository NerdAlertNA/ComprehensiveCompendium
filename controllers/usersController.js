var express = require('express');
var router = express.Router();

var User = require("../models/user");
var Component = require("../models/component");

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

// put route for edit ---^
router.put('/:id', function(req, res) {
	User.findByIdAndUpdate(req.params.id, {
		first_name: req.body.first_name,
		password: req.body.password
	}, { new: true })
	.exec(function(err, user) {
		if (err) { console.log(err); }
		console.log(user);
		res.render('users/show.hbs');
	});
});

// COMPONENT SECTION

// show user's components route
router.get('/:id/components', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user){
		if (err) { console.log(err); }
		console.log(user.id)
		console.log(user.components)
		res.render('userComponents/index.hbs', {
			components: user.components,
			user: user
		});
	});
});


// new component route
router.get('/:id/new_component', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user){
		if (err) { console.log(err); }
		res.render('userComponents/new.hbs', {
			user: user
		});
	});
});

router.post('/:id/components', function(req, res){
	User.findById(req.params.id)
	.exec(function(err, user) {
		if (err) { console.log(err); }
		const newComponent = new Component ({
			title: req.body.title,
			content: req.body.content
		});

		newComponent.save(function(err) {
			if (err) { console.log(err); }
			console.log('Component saved to db!')
		});

		user.components.push(newComponent)

		user.save(function(err) {
			if (err) { console.log(err); }
			console.log('Component Created!')
		});

		res.redirect(`/users/${user.id}/components`)
	});
});

// router.get('/:id/new_component', function(req, res){
// 	res.render('userComponents/new.hbs')
// });

// router.post('/:id/components', function(req, res){
// 	var component = new Component({
// 		title: req.body.title,
// 		content: req.body.content
// 	});
// 	components.save(function(err, component){
// 		if (err) {console.log(err); }
// 		console.log(component);
// 		res.redirect('/users/:id/components')
// 	});
// });

// router.post('/:id/components', function(req, res) {
// 	User.findById(req.params.id)
// 	.exec(function(err, user){
// 		user.components.push(new Component({
// 			title: req.body.title,
// 			content: req.body.content
// 		}));
// 		user.save(function(err){
// 			if (err) { console.log(err); }

// 			res.send(user);
// 		});
// 	});
// });


module.exports = router;