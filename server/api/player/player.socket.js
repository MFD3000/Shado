/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Player = require('../models').Player;

exports.register = function(socket) {
    Player.afterCreate(function (player) {
        onSave(socket, player);
    });
    Player.afterUpdate(function (player) {
        onSave(socket, player);
    });
    Player.afterDestroy(function (player) {
        onRemove(socket, player);
    });
}

function onSave(socket, player, cb) {
    socket.emit('player:save', player);
}

function onRemove(socket, player, cb) {
    socket.emit('player:remove', player);
}
