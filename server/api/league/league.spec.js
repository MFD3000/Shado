'use strict';

var should = require('should');
var request = require('supertest');
var testUtil = require('../../components/test-util.js');
var db = require('../models');
var app =  require('../../app');

var agent = request.agent(app);

describe('GET /api/leagues', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/leagues')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});


describe('GET /api/leagues/:id/teams', function() {
    var agent;

    before(function(done){
        db.sequelize.sync();
        var account = {
            email: 'test@test.com',
            password: 'test'
        };
        db.User.create(account).then(function(user1){
            var pass = user1.getPassword(password);
            db.League.create({
                name: 'League',
                id: 1
            }).then(function(league1){
                db.Team.create({
                    name: 'Team',
                    id: 1
                }).then(function(team1){
                    team1.setLeague(league1);
                    team1.addUser(user1, {role: 'owner'});
                });
            });
        });
        testUtil.loginUser(request(app),account,function(loginAgent){
            agent = loginAgent;
            done();
        });
    });

    it('should respond with JSON array', function(done) {
        var req = request(app).get('/api/leagues/1/teams');
        agent.attachCookies(req);
        req.expect(200)
            //     .expect('Content-Type', /json/)
           .end(function(err, res) {
               if (err) return done(err);
               res.body.should.be.instanceof(Array);
               res.body.length.should.equal(1);
               done();
           });
    });
});
