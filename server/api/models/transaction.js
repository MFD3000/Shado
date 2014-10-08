module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Transaction', {
        type: {
            type: DataTypes.ENUM,
            values: ['trade', 'freeagent', 'draft']
        }
    })
}