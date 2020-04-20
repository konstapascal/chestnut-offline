// creating model for users table
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User', {
		ID: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		Username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			lowercase: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		IsAdmin: {
			allowNull: false,
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
	});

	return User;
};
