'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FranchiseSchema = new Schema({
  name: String,
  budget: Number,
});

module.exports = mongoose.model('Franchise', FranchiseSchema);
