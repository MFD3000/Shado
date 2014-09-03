'use strict';

var _ = require('lodash');
var Franchise = require('./franchise.model');

// Get list of franchises
exports.index = function(req, res) {
  Franchise.find(function (err, franchises) {
    if(err) { return handleError(res, err); }
    return res.json(200, franchises);
  });
};

// Get a single franchise
exports.show = function(req, res) {
  Franchise.findById(req.params.id, function (err, franchise) {
    if(err) { return handleError(res, err); }
    if(!franchise) { return res.send(404); }
    return res.json(franchise);
  });
};

// Creates a new franchise in the DB.
exports.create = function(req, res) {
  Franchise.create(req.body, function(err, franchise) {
    if(err) { return handleError(res, err); }
    return res.json(201, franchise);
  });
};

// Updates an existing franchise in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Franchise.findById(req.params.id, function (err, franchise) {
    if (err) { return handleError(res, err); }
    if(!franchise) { return res.send(404); }
    var updated = _.merge(franchise, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, franchise);
    });
  });
};

// Deletes a franchise from the DB.
exports.destroy = function(req, res) {
  Franchise.findById(req.params.id, function (err, franchise) {
    if(err) { return handleError(res, err); }
    if(!franchise) { return res.send(404); }
    franchise.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}