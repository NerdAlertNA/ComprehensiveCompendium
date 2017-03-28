var express = require('express');
var router = express.Router();

var User = require("../models/user");
var Component = require("../models/component");

router.get('/', function(req, res){
	Component.find({})
	.exec(function(err, components){
		if (err) { console.log(err); }
		console.log(components);
		res.render('components/index.hbs', {
			components: components
		});
	});
});

module.exports = router;