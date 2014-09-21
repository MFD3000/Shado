'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StakeSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  franchise: {type: Schema.ObjectId, ref: 'Franchise'},
  role: String
});

module.exports = mongoose.model('Stake', StakeSchema);
