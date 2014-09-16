/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var League = require('./league.model');

exports.register = function(socket) {
  League.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  League.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('league:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('league:remove', doc);
}
