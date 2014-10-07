'use strict';

var should = require('should');
var app = require('../../app');
var User = require('../models').User;

var user = User.create({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('User Model', function() {
  before(function(done) {
    // Clear users before testing
    User.destroy({},{truncate: true}).then(function() {
      done();
    });
  });

  afterEach(function(done) {
    User.destroy({},{truncate: true}).then(function() {
      done();
    });
  });

  it('should begin with no users', function(done) {
    User.find().then(function(users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    user.save(function() {
      var userDup = User.build(user);
      userDup.save().then(function() {
              // Fail if you reach this
              should(false).ok
          },function(err) {
              should.exist(err);
              done();
          }
      );
    });
  });

  it('should fail when saving without an email', function(done) {
    user.email = '';
    user.save().then(function() {
            // Fail if you reach this
            should(false).ok
        },function(err) {
            should.exist(err);
            done();
        }
    );
  });

  it("should authenticate user if password is valid", function() {
    user.authenticate('password').should.be.true;
  });

  it("should not authenticate user if password is invalid", function() {
    user.authenticate('blah').should.not.be.true;
  });
});