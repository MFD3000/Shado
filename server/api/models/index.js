if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
        , sequelize = null

    if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
        // the application is executed on Heroku ... use the postgres database
        var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

        sequelize = new Sequelize(match[5], match[1], match[2], {
            dialect:  'postgres',
            protocol: 'postgres',
            port:     match[4],
            host:     match[3],
            logging:  true //false
        })
    } else {
        sequelize =  new Sequelize('shado', 'shado', null, {dialect: 'postgres'});
    }

    global.db = {
        Sequelize: Sequelize,
        sequelize: sequelize,
        User:  sequelize.import(__dirname + '/user'),
        League: sequelize.import(__dirname + '/league'),
        Team: sequelize.import(__dirname + '/team'),
        Player: sequelize.import(__dirname + '/player'),
        PlayerAssignment: sequelize.import(__dirname + '/player_assignment'),
        Stake: sequelize.import(__dirname + '/stake'),
        Sport: sequelize.import(__dirname + '/sport')
    }

    /*
     Associations can be defined here. E.g. like this:
     global.db.User.hasMany(global.db.SomethingElse)
     */

    global.db.Team.belongsTo(global.db.League);
    global.db.Team.belongsTo(global.db.Sport);

    global.db.Player.belongsTo(global.db.Sport);

    global.db.PlayerAssignment.belongsTo(global.db.Player);
    global.db.PlayerAssignment.belongsTo(global.db.Team);

    global.db.Stake.belongsTo(global.db.Team);
    global.db.Stake.belongsTo(global.db.User);
}

module.exports = global.db