'use strict';

var should = require('should');
var testUtil = require('../../components/test-util.js');

var User = require('../models').User;

var userData = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
};

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
    User.findAll().then(function(users) {
      users.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function(done) {
    User.create(userData).then(function() {
        User.build(userData).then(function (userDup) {
            userDup.save().then(function () {
                    // Fail if you reach this
                    should(false).ok
                }, function (err) {
                    should.exist(err);
                    done();
                }
            );
        });
    });
  });

  it('should fail when saving without an email', function(done) {
      User.create(userData).then(function(user) {
          user.email = '';
          user.save().then(function () {
                  // Fail if you reach this
                  should(false).ok
              }, function (err) {
                  should.exist(err);
                  done();
              }
          );
      });
  });

  it("should authenticate user if password is valid", function() {
      User.create(userData).then(function(user) {
          user.authenticate('password').should.be.true;
      });
  });

  it("should not authenticate user if password is invalid", function() {
      User.create(userData).then(function(user) {
          user.authenticate('blah').should.not.be.true;
      });
  });
});