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
			validate: {
				notEmpty: true,
			},
		},
		Type: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true,
				isIn: [['RSA', 'AES']],
			},
		},
		Length: {
			type: Sequelize.INTEGER,
			validate: {
				isInt: true,
				isIn: [[128, 256, 512, 1024, 2048, 4096]],
			},
		},
		PublicKey: {
			type: Sequelize.TEXT,
			validate: {
				notEmpty: true,
			},
		},
		PrivateKey: {
			type: Sequelize.TEXT,
			allowNull: true,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Keypair;
};
