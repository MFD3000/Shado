/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Transaction = require('../models').Transaction;

exports.register = function(socket) {
    Transaction.afterCreate(function (transaction) {
        onSave(socket, transaction);
    });
    Transaction.afterUpdate(function (transaction) {
        onSave(socket, transaction);
    });
    Transaction.afterDestroy(function (transaction) {
        onRemove(socket, transaction);
    });
}

function onSave(socket, transaction, cb) {
    socket.emit('transaction:save', transaction);
}

function onRemove(socket, transaction, cb) {
    socket.emit('transaction:remove', transaction);
}
