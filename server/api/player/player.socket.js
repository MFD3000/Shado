/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Player = require('./player.model');

exports.register = function(socket) {
  Player.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Player.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('player:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('player:remove', doc);
}