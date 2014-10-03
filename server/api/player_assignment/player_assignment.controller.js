'use strict';

var _ = require('lodash');
var PlayerAssignment = require('../models').PlayerAssignment;

// Get list of player_assignments
exports.index = function(req, res) {
    PlayerAssignment.findAll().then(function (player_assignments) {
        return res.json(200, player_assignments);
    }, function(error){
        return handleError(res, error);
    });
};

// Get a single player_assignment
exports.show = function(req, res) {
    PlayerAssignment.find(req.params.id).then(function (player_assignment) {
        if(!player_assignment) { return res.send(404); }
        return res.json(player_assignment);
    }, function(error){
        return handleError(res, error);
    });
};

// Creates a new player_assignment in the DB.
exports.create = function(req, res) {
    PlayerAssignment.create(req.body).then(function(player_assignment){
        return res.json(201, player_assignment);
    },function(error) {
        return handleError(res, error);
    });
};

// Updates an existing player_assignment in the DB.
exports.update = function(req, res) {
    if(req.body.id) { delete req.body.id; }
    PlayerAssignment.find(req.params.id).then(function (player_assignment) {
        if(!player_assignment) { return res.send(404); }
        player_assignment.updateAttributes(req.body).then(function(player_assignment) {
            return res.json(player_assignment);
        }, function(error) {
            return handleError(res, error);
        });
    }, function(error){
        return handleError(res, error);
    });
};

// Deletes a player_assignment from the DB.
exports.destroy = function(req, res) {
    PlayerAssignment.find(req.params.id).then(function (player_assignment) {
        if(!player_assignment) { return res.send(404); }
        player_assignment.destroy().then(function(player_assignment) {
            return res.send(204);
        }, function(error) {
            return handleError(res, error);
        });
    }, function(error){
        return handleError(res, error);
    });
};

function handleError(res, error) {
    return res.send(500, error);
}
