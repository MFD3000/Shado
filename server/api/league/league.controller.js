'use strict';

var _ = require('lodash');
var League = require('./league.model');

// Get list of leagues
exports.index = function(req, res) {
  League.find(function (err, leagues) {
    if(err) { return handleError(res, err); }
    return res.json(200, leagues);
  });
};

// Get a single league
exports.show = function(req, res) {
  League.findById(req.params.id, function (err, league) {
    if(err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    return res.json(league);
  });
};

// Creates a new league in the DB.
exports.create = function(req, res) {
  League.create(req.body,function(err, league) {
    if(err) { return handleError(res, err); }
    return res.json(201, league);
  });
};

// Updates an existing league in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  League.findById(req.params.id, function (err, league) {
    if (err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    var updated = _.merge(league, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, league);
    });
  });
};

// Deletes a league from the DB.
exports.destroy = function(req, res) {
  League.findById(req.params.id, function (err, league) {
    if(err) { return handleError(res, err); }
    if(!league) { return res.send(404); }
    league.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
