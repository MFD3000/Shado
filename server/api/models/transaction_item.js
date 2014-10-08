module.exports = function(sequelize, DataTypes) {
    return sequelize.define('TransactionItem', {
        assetType: {
            type: DataTypes.ENUM,
            values: ['Player', 'DraftPick', 'Budget']
        },
        // JSON type representing a PlayerID, draft pick ID, or
        asset: DataTypes.STRING
    })
}