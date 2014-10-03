module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Stake', {
        role: {
            type: DataTypes.ENUM,
            values: ["owner","manager"]
        }
    })
}