/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PlayerAssignment = require('../models').PlayerAssignment;

exports.register = function(socket) {
    PlayerAssignment.afterCreate(function (player_assignment) {
        onSave(socket, player_assignment);
    });
    PlayerAssignment.afterUpdate(function (player_assignment) {
        onSave(socket, player_assignment);
    });
    PlayerAssignment.afterDestroy(function (player_assignment) {
        onRemove(socket, player_assignment);
    });
}

function onSave(socket, player_assignment, cb) {
    socket.emit('player_assignment:save', player_assignment);
}

function onRemove(socket, player_assignment, cb) {
    socket.emit('player_assignment:remove', player_assignment);
}
