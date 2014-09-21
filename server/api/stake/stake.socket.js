/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stake = require('./stake.model');

exports.register = function(socket) {
  Stake.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stake.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stake:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stake:remove', doc);
}