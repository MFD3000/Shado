'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlayerAssignmentSchema = new Schema({
  team: {type: Schema.ObjectId, ref: 'Team'},
  player: {type: Schema.ObjectId, ref: 'Player'},
  status: String,
});

module.exports = mongoose.model('PlayerAssignment', PlayerAssignmentSchema);
