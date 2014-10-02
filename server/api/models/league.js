module.exports = function(sequelize, DataTypes) {
    return sequelize.define('League', {
        name: DataTypes.STRING,
        teamCount: DataTypes.INTEGER,
        rosterLimit: DataTypes.INTEGER,
        status: {
            type: DataTypes.ENUM,
            values: ['new', 'active', 'inactive']
        },
        salaryFloor: DataTypes.INTEGER,
        softCap: DataTypes.INTEGER,
        hardCap: DataTypes.INTEGER
    })
}