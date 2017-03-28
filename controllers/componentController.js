var express = require('express');
var router = express.Router();

var User = require("../models/user");
var Component = require("../models/component");

// shows all posts(components)
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

// show indiviudal components
router.get('/:id', function(req, res){
	Component.findById(req.params.id)
	.exec(function(err, component) {
		if (err) { console.log(err); }
		console.log(component);
		res.render('components/show.hbs', {
			component: component
		});
	});
});

module.exports = router;