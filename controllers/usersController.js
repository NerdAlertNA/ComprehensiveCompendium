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

module.exports = router;