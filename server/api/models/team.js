module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Team', {
        name: DataTypes.STRING,
        latlong: DataTypes.STRING,
        special: {
            // 'draft' and 'free agency' are virtual teams for transaction purposes.
            type: DataTypes.ENUM,
            values: ['draft', 'freeagency']
        }
    })
}