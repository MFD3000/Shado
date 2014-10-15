if (!global.hasOwnProperty('db')) {
    var Sequelize = require('../../components/sequelize')
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
    } else if(process.env.NODE_ENV == 'test') {
        sequelize =  new Sequelize('shadotest', 'shado', null, {dialect: 'postgres'});
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
        Sport: sequelize.import(__dirname + '/sport'),
        Transaction: sequelize.import(__dirname + '/transaction'),
        TransactionItem: sequelize.import(__dirname + '/transaction_item'),
        TransactionApproval: sequelize.import(__dirname + '/transaction_approval')
    }

    /*
     Associations can be defined here. E.g. like this:
     global.db.User.hasMany(global.db.SomethingElse)
     */

    global.db.League.hasMany(global.db.Team);
    global.db.Team.belongsTo(global.db.League);
    global.db.Team.belongsTo(global.db.Sport);

    global.db.Player.belongsTo(global.db.Sport);

    global.db.PlayerAssignment.belongsTo(global.db.Player);
    global.db.PlayerAssignment.belongsTo(global.db.Team);

    global.db.User.hasMany(global.db.Team, {through: global.db.Stake});
    global.db.Team.hasMany(global.db.User, {through: global.db.Stake});

    global.db.Transaction.belongsTo(global.db.League);
    global.db.Transaction.hasMany(global.db.TransactionApproval);

    global.db.TransactionItem.belongsTo(global.db.Transaction);
    global.db.TransactionItem.belongsTo(global.db.Team, {as: 'source'});
    global.db.TransactionItem.belongsTo(global.db.Team, {as: 'destination'});

    global.db.TransactionApproval.belongsTo(global.db.Team);
}

module.exports = global.db