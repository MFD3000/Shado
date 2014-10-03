module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Player', {
        salary: DataTypes.INTEGER,
        contractExpires: DataTypes.DATE,
        statsFeed: DataTypes.STRING,
        realWorldTeam: DataTypes.STRING
    })
}