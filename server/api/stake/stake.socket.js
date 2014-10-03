/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stake = require('../models').Stake;

exports.register = function(socket) {
    Stake.afterCreate(function (stake) {
        onSave(socket, stake);
    });
    Stake.afterUpdate(function (stake) {
        onSave(socket, stake);
    });
    Stake.afterDestroy(function (stake) {
        onRemove(socket, stake);
    });
}

function onSave(socket, stake, cb) {
    socket.emit('stake:save', stake);
}

function onRemove(socket, stake, cb) {
    socket.emit('stake:remove', stake);
}
