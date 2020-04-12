const db = require('../models/db.index');
const Keypair = db.keypair;
const User = db.user;

// Get all keypairs of 1 user by id
// TODO Change route to: Get all keyapairs of currently logged in user (using JWT)
exports.getMyKeys = (req, res) => {
	const id = req.params.id;

	Keypair.findAll({
		where: {
			UserID: id,
		},
	}).then((keypairs) => {
		if (keypairs != 0) {
			res.status(200).json(keypairs);
		} else {
			res.status(404).json({
				status: 'Error',
				message: `User with id of ${id} does not exist or does not have any keys.`,
			});
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
		.then((keypairs) => {
			if (keypairs) {
				res.status(200).json(keypairs);
			} else {
				res.status(404).json({
					status: 'Error',
					message: 'No users or no keys found.',
				});
			}
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: 'Error retrieving public keys of users. Try again later.',
			});
		});
};

// Create new key for user ID
// TODO Change to: Generate key for currently logged in user (JWT)
exports.createKey = (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const type = req.body.type;
	const length = req.body.length;
	const publicKey = req.body.publicKey;
	const privateKey = req.body.privateKey;

	// Validate request
	if (!name || !type || !length || !publicKey) {
		res.status(400).json({
			status: 'Error',
			message:
				'All required fields (name, type, length, publicKey) must be filled!',
		});
		return;
	}

	// Create a keypair schema
	const KeypairSchema = {
		Name: name,
		Type: type,
		Length: length,
		PublicKey: publicKey,
		PrivateKey: privateKey,
		UserID: id,
	};

	// Run query to save schema in the database
	Keypair.create(KeypairSchema)
		.then(() => {
			res.status(200).json({
				status: 'Success',
				message: `Keypair ${name} created successfully for user with id ${id}!`,
			});
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: `Error occurred while creating keypair for user with id ${id}. Try again later.`,
			});
		});
};

// Delete key by ID
// TODO Check if key UserID of deleted key is the same as the JWT payload ID
exports.deleteKey = (req, res) => {
	const id = req.params.id;

	Keypair.destroy({
		where: { KeypairID: id },
	})
		.then((keypair) => {
			if (keypair) {
				res.status(200).json({
					status: 'Success',
					message: 'Keypair was deleted successfully!',
				});
			} else {
				res.status(404).json({
					status: 'Error',
					message: `Keypair with id ${id} was not found!`,
				});
			}
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: `Could not delete keypair with id ${id}`,
			});
		});
};
