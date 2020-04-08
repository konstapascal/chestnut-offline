const db = require('../models/db.index');
const Keypair = db.keypair;
const User = db.user;

// Get all keypairs of 1 user by id
exports.getMyKeys = (req, res) => {
	const id = req.params.id;

	Keypair.findAll({
		where: {
			UserID: id,
		},
	}).then((data) => {
		if (data) {
			res.status(200).send(data);
		}
	});
};

// Get all public keypairs for all users, including their username
exports.getAllPublicKeys = (req, res) => {
	Keypair.findAll({
		attributes: ['KeypairID', 'Name', 'Type', 'Length', 'PublicKey', 'UserID'],
		include: [
			{
				model: User,
				attributes: ['Username'],
			},
		],
	})
		.then((data) => {
			if (data) {
				res.status(200).send(data);
			}
		})
		.catch(() => {
			res.status(500).send({
				message: 'Error retrieving public keys of users. Try again later.',
			});
		});
};

// Create new key for user ID
exports.createKey = (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const type = req.body.type;
	const length = req.body.length;
	const publicKey = req.body.publicKey;

	// Validate request
	if (!name || !type || !length || !publicKey) {
		res.status(400).send({
			message:
				'All required fields (name, type, length, publicKey) must be filled!',
		});
		return;
	}

	// Create a keypair schema
	const KeypairSchema = {
		Name: req.body.name,
		Type: req.body.type,
		Length: req.body.length,
		PublicKey: req.body.publicKey,
		PrivateKey: req.body.privateKey,
		UserID: id,
	};

	// Run query to save schema in the database
	Keypair.create(KeypairSchema)
		.then(() => {
			res
				.status(200)
				.send({ message: 'Keypair ' + name + ' created successfully!' });
		})
		.catch(() => {
			res.status(500).send({
				message: 'Error occurred while creating keypair.',
			});
		});
};

// Delete key by ID
exports.deleteKey = (req, res) => {
	const id = req.params.id;

	Keypair.destroy({
		where: { KeypairID: id },
	})
		.then((data) => {
			if (data) {
				res.status(200).send({
					message: 'Keypair was deleted successfully!',
				});
			} else {
				res.status(404).send({
					message: `Keypair with id ${id} was not found!`,
				});
			}
		})
		.catch(() => {
			res.status(500).send({
				message: 'Could not delete user with id ' + id,
			});
		});
};
