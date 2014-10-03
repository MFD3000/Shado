/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sport = require('../models').Sport;

exports.register = function(socket) {
    Sport.afterCreate(function (sport) {
        onSave(socket, sport);
    });
    Sport.afterUpdate(function (sport) {
        onSave(socket, sport);
    });
    Sport.afterDestroy(function (sport) {
        onRemove(socket, sport);
    });
}

function onSave(socket, sport, cb) {
    socket.emit('sport:save', sport);
}

function onRemove(socket, sport, cb) {
    socket.emit('sport:remove', sport);
}
