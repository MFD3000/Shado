/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PlayerAssignment = require('./player_assignment.model');

exports.register = function(socket) {
  PlayerAssignment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PlayerAssignment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('player_assignment:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('player_assignment:remove', doc);
}