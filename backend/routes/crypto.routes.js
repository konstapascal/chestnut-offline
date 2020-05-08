module.exports = (app) => {
	const Crypto = require('../controllers/crypto.controller');
	const router = require('express').Router();
	const jwtMiddleware = require('../middlewares/check.token');

	// Encrypt text
	router.post('/encrypt', jwtMiddleware.checkToken, Crypto.encryptText);

	// Decrypt text
	router.post('/decrypt', jwtMiddleware.checkToken, Crypto.decryptText);

	app.use('/api', router);
};
