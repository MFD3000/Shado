module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TransactionApproval', {
        status: {
            type: DataTypes.ENUM,
            values: ['Pending', 'Approved', 'Rejected']
        },
        role: {
            type: DataTypes.ENUM,
            values: ['participant', 'commish']
        }
    })
}