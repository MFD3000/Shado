var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var validatePresenceOf = function(value) {
    return value && value.length;
};

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notBlank: function(email){
                    if (authTypes.indexOf(this.provider) == -1) {
                        if (!validatePresenceOf(email)) {
                            throw new Error('Email cannot be blank')
                        }
                    }
                }
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ["admin","commish","gm","manager"]
        },
        franchiseName: DataTypes.STRING,
        budget: DataTypes.INTEGER,
        hashedPassword: {
            type: DataTypes.STRING,
            validate: {
                notBlank: function (password) {
                    if (authTypes.indexOf(this.provider) == -1) {
                        if (!validatePresenceOf(password)) {
                            throw new Error('Invalid password')
                        }
                    }
                }
            }
        },
        provider: {
            type: DataTypes.ENUM,
            values: ["local","github","google","facebook","twitter"]
        },
        salt: DataTypes.STRING,
        facebook: DataTypes.STRING,
        twitter: DataTypes.STRING,
        google: DataTypes.STRING,
        github: DataTypes.STRING
    },{
        getterMethods   : {
            password: function() { return this._password },
            profile: function() {
                return {
                    'name': this.name,
                    'role': this.role
                };
            },
            token: function() {
                return {
                    'id': this.id,
                    'role': this.role
                };
            }
        },
        setterMethods   : {
            password: function(password) {
                this._password = password;
                this.salt = this.makeSalt();
                this.hashedPassword = this.encryptPassword(password);
            }
        },
        instanceMethods: {
            /**
             * Authenticate - check if the passwords are the same
             *
             * @param {String} plainText
             * @return {Boolean}
             * @api public
             */
            authenticate: function(plainText) {
                return this.encryptPassword(plainText) === this.hashedPassword;
            },

            /**
             * Make salt
             *
             * @return {String}
             * @api public
             */
            makeSalt: function() {
                return crypto.randomBytes(16).toString('base64');
            },

            /**
             * Encrypt password
             *
             * @param {String} password
             * @return {String}
             * @api public
             */
            encryptPassword: function(password) {
                if (!password || !this.salt) return '';
                var salt = new Buffer(this.salt, 'base64');
                return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
            }
        }
    })
}