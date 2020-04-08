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
			validate: {
				notEmpty: true,
			},
		},
		Password: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true,
			},
		},
		Email: {
			type: Sequelize.STRING,
			unique: true,
			lowercase: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		IsAdmin: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
	});

	return User;
};
