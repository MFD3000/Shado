'use strict';

var _ = require('lodash');
var League = require('../models').League;

// Get list of leagues
exports.index = function(req, res) {
  League.findAll().success(function (leagues) {
      return res.json(200, leagues);
  }).error(function(error){
      return handleError(res, error);
  });
};

// Get a single league
exports.show = function(req, res) {
    League.find(req.params.id).success(function (league) {
        if(!league) { return res.send(404); }
        return res.json(league);
    }).error(function(error){
        return handleError(res, error);
    });
};

// Creates a new league in the DB.
exports.create = function(req, res) {
  League.create(req.body).success(function(league){
      return res.json(201, league);
  }).error(function(error) {
      return handleError(res, error);
  });
};

// Updates an existing league in the DB.
exports.update = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  League.find(req.params.id).success(function (league) {
      if(!league) { return res.send(404); }
      league.updateAttributes(req.body).success(function(league) {
          return res.json(league);
      }).error(function(error) {
          return handleError(res, error);
      });
  }).error(function(error){
      return handleError(res, error);
  });
};

// Deletes a league from the DB.
exports.destroy = function(req, res) {
  League.find(req.params.id).success(function (league) {
      if(!league) { return res.send(404); }
      league.destroy().success(function(league) {
          return res.send(204);
      }).error(function(error) {
          return handleError(res, error);
      });
  }).error(function(error){
      return handleError(res, error);
  });
};

function handleError(res, error) {
  return res.send(500, error);
}
