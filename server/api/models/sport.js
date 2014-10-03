module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Sport', {
        name: DataTypes.STRING
    })
}