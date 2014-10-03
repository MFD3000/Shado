module.exports = function(sequelize, DataTypes) {
    return sequelize.define('PlayerAssignment', {
        status: {
            type: DataTypes.ENUM,
            values: ["active","inactive"]
        }
    })
}