/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Team = require('../models').Team;

exports.register = function(socket) {
    Team.afterCreate(function (team) {
        onSave(socket, team);
    });
    Team.afterUpdate(function (team) {
        onSave(socket, team);
    });
    Team.afterDestroy(function (team) {
        onRemove(socket, team);
    });
}

function onSave(socket, team, cb) {
    socket.emit('team:save', team);
}

function onRemove(socket, team, cb) {
    socket.emit('team:remove', team);
}
