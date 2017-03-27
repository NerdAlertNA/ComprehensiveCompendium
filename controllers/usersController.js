var express = require('express');
var router = express.Router();

var User = require("../models/user");

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





module.exports = router;