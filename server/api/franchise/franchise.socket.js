/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Franchise = require('./franchise.model');

exports.register = function(socket) {
  Franchise.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Franchise.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('franchise:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('franchise:remove', doc);
}