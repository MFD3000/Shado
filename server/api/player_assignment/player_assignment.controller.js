'use strict';

var _ = require('lodash');
var PlayerAssignment = require('./player_assignment.model');

// Get list of player_assignments
exports.index = function(req, res) {
  PlayerAssignment.find(function (err, player_assignments) {
    if(err) { return handleError(res, err); }
    return res.json(200, player_assignments);
  });
};

// Get a single player_assignment
exports.show = function(req, res) {
  PlayerAssignment.findById(req.params.id, function (err, player_assignment) {
    if(err) { return handleError(res, err); }
    if(!player_assignment) { return res.send(404); }
    return res.json(player_assignment);
  });
};

// Creates a new player_assignment in the DB.
exports.create = function(req, res) {
  PlayerAssignment.create(req.body, function(err, player_assignment) {
    if(err) { return handleError(res, err); }
    return res.json(201, player_assignment);
  });
};

// Updates an existing player_assignment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PlayerAssignment.findById(req.params.id, function (err, player_assignment) {
    if (err) { return handleError(res, err); }
    if(!player_assignment) { return res.send(404); }
    var updated = _.merge(player_assignment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, player_assignment);
    });
  });
};

// Deletes a player_assignment from the DB.
exports.destroy = function(req, res) {
  PlayerAssignment.findById(req.params.id, function (err, player_assignment) {
    if(err) { return handleError(res, err); }
    if(!player_assignment) { return res.send(404); }
    player_assignment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}