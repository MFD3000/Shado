'use strict';

var User = require('../models').User;
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

var omitPasswordAndSalt = function(user) {
    return _.omit(element.toJSON(), 'salt').omit(element.toJSON(), 'hashedPassword');
}

var bulkOmitPasswordAndSalt = function(users) {
  return _.map(users, function(element,index,list) {
      return omitPasswordAndSalt(element);
  });
}


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.findAll().then(function (users) {
        return res.json(200, bulkOmitPasswordAndSalt(users));
    }, function(error){
        return res.send(500, error);;
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res) {
    var newUser = User.build(req.body)
    newUser.save().success(function(user){
        return res.json(201, user);
    }).error(function(error) {
        return validationError(res, error);
    });
};
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user.id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  User.find(req.params.id).then(function (user) {
      if(!user) { return res.send(401); }
      return res.json(user.profile);
  }, function(error){
      return next(error);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.find(req.params.id).then(function (user) {
      user.destroy().then(function(user) {
          return res.send(204);
      }, function(error) {
          return res.send(500, err);
      });
  }, function(error){
      return res.send(500, err);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find(req.params.id).then(function (user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save().then(function() {
        res.send(200);
      },function(error){
          return validationError(res, err);
      });
    } else {
      res.send(403);
    }
  }, function(error){
      return res.send(500, err);
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    User.find(req.user.id).then(function(user){
     if (!user) return res.json(401);
     user = omitPasswordAndSalt(user) ;
     res.json(user);
  }, function(error) {
      return next(error);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};