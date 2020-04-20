module.exports = (app) => {
	const Crypto = require('../controllers/crypto.controller');
	const router = require('express').Router();

	// Encrypt text
	router.post('/encrypt', Crypto.encryptText);

	// Decrypt text
	router.post('/decrypt', Crypto.decryptText);

	app.use('/api', router);
};
