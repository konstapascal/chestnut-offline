const db = require('../models/db.index');
const Keypair = db.keypair;
const User = db.user;

// Get all keys of currently logged in user
exports.getMyKeys = (req, res) => {
	// Store id that has been passed from middlewares
	const userID = res.locals.decodedData.id;

	Keypair.findAll({
		where: {
			UserID: userID,
		},
	})
		.then((keypairs) => {
			if (keypairs != 0) {
				return res.status(200).json({ keypairs });
			} else {
				return res.status(404).json({
					status: 'Error',
					message: `User with id of ${userID} does not exist or does not have any keys.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occured while getting keys: ' + err,
			});
		});
};

// Get all public keys of 1 user by id
exports.getAllPublicKeysByID = (req, res) => {
	const userID = req.params.id;

	Keypair.findAll({
		where: {
			UserID: userID,
		},
		attributes: ['Name', 'Type', 'Length', 'PublicKey', 'UserID'],
	})
		.then((keypairs) => {
			if (keypairs != 0) {
				return res.status(200).json({ keypairs });
			} else {
				return res.status(404).json({
					status: 'Error',
					message: `User with id of ${id} does not exist or does not have any keys.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occured while getting keys: ' + err,
			});
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
				res.status(200).json({ keypairs });
			} else {
				res.status(404).json({
					status: 'Error',
					message: 'No users or no keys found.',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occured while retrieving public keys: ' + err,
			});
		});
};

// Create new key for currently logged in user
exports.createKey = (req, res) => {
	const userID = res.locals.decodedData.id;
	const name = req.body.name;
	const type = req.body.type;
	const length = req.body.length;
	const publicKey = req.body.publicKey;
	const privateKey = req.body.privateKey;

	// Validate request
	if (!name || !type || !length || !publicKey || !privateKey) {
		res.status(400).json({
			status: 'Error',
			message:
				'All required fields (name, type, length, publicKey, privateKey) must be filled!',
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
		UserID: userID,
	};

	// Run query to save schema in the database
	Keypair.create(KeypairSchema)
		.then(() => {
			res.status(200).json({
				status: 'Success',
				message: `Keypair ${name} created successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occurred while creating keypair: ' + err,
			});
		});
};

// Delete key by id, checking if key belongs to the user making the request
exports.deleteKey = async (req, res) => {
	const keyID = req.params.id;
	const userID = res.locals.decodedData.id;

	// Check for keypair entry with key ID and user ID, proving ownership of key
	const getUserID = await Keypair.findOne({
		where: { UserID: userID, KeypairID: keyID },
	});

	// User does not own the keypair and therefore is not allowed to delete it
	if (!getUserID) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'Keypair not found or forbidden action!',
		});
	}

	// Delete key
	Keypair.destroy({
		where: { KeypairID: keyID },
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
					message: `Keypair with id ${keyID} was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: `Could not delete keypair with id ${keyID}: ` + err,
			});
		});
};
