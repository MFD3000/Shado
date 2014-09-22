'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FranchiseSchema = new Schema({
  name: String,
  league: {type: Schema.ObjectId, ref: 'League'},
});

module.exports = mongoose.model('Franchise', FranchiseSchema);
