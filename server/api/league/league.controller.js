'use strict';

var _ = require('lodash');
var League = require('../models').League;
var Team = require('../models').Team;
var User = require('../models').User;

// Get list of leagues
exports.index = function(req, res) {
  League.findAll().then(function (leagues) {
      return res.json(200, leagues);
  }, function(error){
      return handleError(res, error);
  });
};

// Get a single league
exports.show = function(req, res) {
    League.find(req.params.id).then(function (league) {
        if(!league) { return res.send(404); }
        return res.json(league);
    }, function(error){
        return handleError(res, error);
    });
};

// Creates a new league in the DB.
exports.create = function(req, res) {
  League.create(req.body).then(function(league){
      return res.json(201, league);
  },function(error) {
      return handleError(res, error);
  });
};

// Updates an existing league in the DB.
exports.update = function(req, res) {
  if(req.body.id) { delete req.body.id; }
  League.find(req.params.id).then(function (league) {
      if(!league) { return res.send(404); }
      league.updateAttributes(req.body).then(function(league) {
          return res.json(league);
      }, function(error) {
          return handleError(res, error);
      });
  }, function(error){
      return handleError(res, error);
  });
};

// Deletes a league from the DB.
exports.destroy = function(req, res) {
  League.find(req.params.id).then(function (league) {
      if(!league) { return res.send(404); }
      league.destroy().then(function(league) {
          return res.send(204);
      }, function(error) {
          return handleError(res, error);
      });
  }, function(error){
      return handleError(res, error);
  });
};

// Get the teams owned by the current user in a single league
exports.teams = function(req, res) {
    var user = req.user;
    user.getTeams({where: {LeagueId: req.params.id}}).then(function (teams) {
        if(!teams) { return res.send(404); }
        return res.json(teams);
    }, function(error){
        return handleError(res, error);
    });
};

// Get your rivals' teams in a given league
// UNDER DEVELOPMENT
exports.rival_teams = function(req, res) {
    var me = req.user;
    var teams = Team.findAll({
        where: {LeagueId: req.params.id},
        include: [ User ]
    }).then(function (teams) {
        if(!teams) { return res.send(404); }
        var filteredTeams = _.select(teams, function(team){
            // only select the teams whose user list doesn't include me
            var myTeam = _.select(team.users, function(user){
                    return user.id == me.id;
                }).length == 0;
            return !myTeam;
        });
        return res.json(filteredTeams);
    }, function(error){
        return handleError(res, error);
    });
};


function handleError(res, error) {
  return res.send(500, error);
}
