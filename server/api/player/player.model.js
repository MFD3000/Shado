'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  contract: {
    salary: Number,
    expires: Date,
  },
  sport: String, 
  statsFeed: String,
  realWorldTeam: String
});

module.exports = mongoose.model('Player', PlayerSchema);
