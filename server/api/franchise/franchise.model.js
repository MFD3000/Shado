'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FranchiseSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Franchise', FranchiseSchema);