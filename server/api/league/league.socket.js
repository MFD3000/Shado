/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var League = require('../models').League;

exports.register = function(socket) {
  League.afterCreate(function (league) {
      onSave(socket, league);
  });
  League.afterUpdate(function (league) {
      onSave(socket, league);
  });
  League.afterDestroy(function (league) {
    onRemove(socket, league);
  });
}

function onSave(socket, league, cb) {
  socket.emit('league:save', league);
}

function onRemove(socket, league, cb) {
  socket.emit('league:remove', league);
}
