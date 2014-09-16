'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LeagueSchema = new Schema({
  name: String,
  info: String,
  teamCount: Number,
  restrictions: {
    rosterLimit: Number,
    salaryFloor: Number,
    softCap: Number,
    hardCap: Number,
  },
  luxuryTax: Number,
  franchises: [{type: Schema.ObjectId, ref: 'Franchise'}], 
  commissioners: [{type: Schema.ObjectId, ref: 'User'}], 
});

module.exports = mongoose.model('League', LeagueSchema);
