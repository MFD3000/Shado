/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Team = require('./team.model');

exports.register = function(socket) {
  Team.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Team.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('team:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('team:remove', doc);
}