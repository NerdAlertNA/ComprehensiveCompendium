var express = require('express');
var router = express.Router();

var User = require("../models/user");
var Component = require("../models/component");

router.get('/', function indexComonents(req, res){
	User.findById(req.params.userId)
	.exec(function(err, user){
		if (err) { console.log(err); }

		res.render('components/index.hbs', {
			user: user
		});
	});
});