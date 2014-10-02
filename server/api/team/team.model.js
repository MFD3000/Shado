'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  franchise: {type: Schema.ObjectId, ref: 'Franchise'},
  longlat: String,
  sport: String,
  league: {type: Schema.ObjectId, ref: 'League'}
});

module.exports = mongoose.model('Team', TeamSchema);
