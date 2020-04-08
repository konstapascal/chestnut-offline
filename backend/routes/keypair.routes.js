module.exports = (app) => {
	const Keypair = require('../controllers/keypair.controller');
	const router = require('express').Router();

	// Get all keypairs of 1 user by id
	router.get('/users/:id', Keypair.getMyKeys);

	// Get all public keypairs of all users
	router.get('/', Keypair.getAllPublicKeys);

	// Create new key for user id
	router.post('/new/users/:id', Keypair.createKey);

	// Delete key by id
	router.delete('/:id', Keypair.deleteKey);

	app.use('/api/keys', router);
};
