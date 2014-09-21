'use strict';

var _ = require('lodash');
var Stake = require('./stake.model');

// Get list of stakes
exports.index = function(req, res) {
  Stake.find(function (err, stakes) {
    if(err) { return handleError(res, err); }
    return res.json(200, stakes);
  });
};

// Get a single stake
exports.show = function(req, res) {
  Stake.findById(req.params.id, function (err, stake) {
    if(err) { return handleError(res, err); }
    if(!stake) { return res.send(404); }
    return res.json(stake);
  });
};

// Creates a new stake in the DB.
exports.create = function(req, res) {
  Stake.create(req.body, function(err, stake) {
    if(err) { return handleError(res, err); }
    return res.json(201, stake);
  });
};

// Updates an existing stake in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stake.findById(req.params.id, function (err, stake) {
    if (err) { return handleError(res, err); }
    if(!stake) { return res.send(404); }
    var updated = _.merge(stake, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stake);
    });
  });
};

// Deletes a stake from the DB.
exports.destroy = function(req, res) {
  Stake.findById(req.params.id, function (err, stake) {
    if(err) { return handleError(res, err); }
    if(!stake) { return res.send(404); }
    stake.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}