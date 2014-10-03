'use strict';

var _ = require('lodash');
var Stake = require('../models').Stake;

// Get list of stakes
exports.index = function(req, res) {
    Stake.findAll().then(function (stakes) {
        return res.json(200, stakes);
    }, function(error){
        return handleError(res, error);
    });
};

// Get a single stake
exports.show = function(req, res) {
    Stake.find(req.params.id).then(function (stake) {
        if(!stake) { return res.send(404); }
        return res.json(stake);
    }, function(error){
        return handleError(res, error);
    });
};

// Creates a new stake in the DB.
exports.create = function(req, res) {
    Stake.create(req.body).then(function(stake){
        return res.json(201, stake);
    },function(error) {
        return handleError(res, error);
    });
};

// Updates an existing stake in the DB.
exports.update = function(req, res) {
    if(req.body.id) { delete req.body.id; }
    Stake.find(req.params.id).then(function (stake) {
        if(!stake) { return res.send(404); }
        stake.updateAttributes(req.body).then(function(stake) {
            return res.json(stake);
        }, function(error) {
            return handleError(res, error);
        });
    }, function(error){
        return handleError(res, error);
    });
};

// Deletes a stake from the DB.
exports.destroy = function(req, res) {
    Stake.find(req.params.id).then(function (stake) {
        if(!stake) { return res.send(404); }
        stake.destroy().then(function(stake) {
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
