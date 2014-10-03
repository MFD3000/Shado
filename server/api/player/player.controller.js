'use strict';

var _ = require('lodash');
var Player = require('../models').Player;

// Get list of players
exports.index = function(req, res) {
    Player.findAll().then(function (players) {
        return res.json(200, players);
    }, function(error){
        return handleError(res, error);
    });
};

// Get a single player
exports.show = function(req, res) {
    Player.find(req.params.id).then(function (player) {
        if(!player) { return res.send(404); }
        return res.json(player);
    }, function(error){
        return handleError(res, error);
    });
};

// Creates a new player in the DB.
exports.create = function(req, res) {
    Player.create(req.body).then(function(player){
        return res.json(201, player);
    },function(error) {
        return handleError(res, error);
    });
};

// Updates an existing player in the DB.
exports.update = function(req, res) {
    if(req.body.id) { delete req.body.id; }
    Player.find(req.params.id).then(function (player) {
        if(!player) { return res.send(404); }
        player.updateAttributes(req.body).then(function(player) {
            return res.json(player);
        }, function(error) {
            return handleError(res, error);
        });
    }, function(error){
        return handleError(res, error);
    });
};

// Deletes a player from the DB.
exports.destroy = function(req, res) {
    Player.find(req.params.id).then(function (player) {
        if(!player) { return res.send(404); }
        player.destroy().then(function(player) {
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
