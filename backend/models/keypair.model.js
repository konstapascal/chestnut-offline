// creating model for keypairs table
module.exports = (sequelize, Sequelize) => {
	const Keypair = sequelize.define('Keypair', {
		KeypairID: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		Name: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		Type: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isIn: [['RSA']],
			},
		},
		Length: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				isIn: [[512, 1024, 2048, 4096]],
			},
		},
		PublicKey: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		PrivateKey: {
			type: Sequelize.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Keypair;
};
