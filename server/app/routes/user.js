'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

// Check if Session is still valid
router.get('/checkResetSession', function (req, res, next) {
  User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      res.send('Password reset token is invalid or has expired.');
    } else {
      res.json(user);
    }
  });
});

// Evaluate Id
router.param('id', function (req, res, next, id) {
  User.findById(id).exec()
    .then(function (user) {
      if (!user) throw HttpError(404);
      else {
        req.user = user;
        next();
      }
    })
    .then(null, next);
});

// Get Specific User
router.get('/:id', ensureAuthenticated, function (req, res) {
  res.json(req.user);
});

// Create User
router.post('/', function(req, res, next){
    var formattedUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(formattedUser)
    .then(function(user){
      res.json(user);
    })
    .then(null, next);
});


module.exports = router;
