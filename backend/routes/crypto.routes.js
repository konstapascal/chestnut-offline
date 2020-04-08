module.exports = (app) => {
	const Crypto = require('../controllers/crypto.controller');
	const router = require('express').Router();

	// Encrypt text
	router.post('/encryption', Crypto.encryptText);

	// Decrypt text
	router.post('/decryption', Crypto.decryptText);

	app.use('/api', router);
};
