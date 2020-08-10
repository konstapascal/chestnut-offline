module.exports = (app) => {
	const Keypair = require('../controllers/keypair.controller');
	const router = require('express').Router();
	const jwtMiddleware = require('../middlewares/check.token');

	// Get all keys of currently logged in user
	router.get('/users/me', jwtMiddleware.checkToken, Keypair.getMyKeys);

	// Get all public keys of 1 user by id
	router.get(
		'/users/:id',
		jwtMiddleware.checkToken,
		Keypair.getAllPublicKeysByID
	);

	// Get all public keypairs of all users and their name
	router.get('/', jwtMiddleware.checkToken, Keypair.getAllPublicKeys);

	// Create new key for currently logged in user
	router.post('/new/users/me', jwtMiddleware.checkToken, Keypair.createKey);

	// Delete key by id, checking if key belongs to the user making the request
	router.delete('/:id', jwtMiddleware.checkToken, Keypair.deleteKey);

	app.use('/api/keys', router);
};
