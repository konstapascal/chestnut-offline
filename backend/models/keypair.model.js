// creating model for keypairs table
module.exports = (sequelize, Sequelize) => {
	const Keypair = sequelize.define('Keypairs', {
		KeypairID: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			unique: true,
			primaryKey: true,
		},
		Type: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isIn: [['RSA', 'AES']],
			},
		},
		Length: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				isIn: [[512, 1024, 2048]],
			},
		},
		PublicKey: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		PrivateKey: {
			type: Sequelize.STRING,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Keypair;
};
