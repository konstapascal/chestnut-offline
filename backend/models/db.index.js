const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	define: {
		timestamps: false,
	},

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.keypairs = require('./keypair.model.js')(sequelize, Sequelize);

//1 user has many keypairs, 1 keypair belongs to 1 user
db.users.hasMany(db.keypairs);
db.keypairs.belongsTo(db.users);

module.exports = db;
