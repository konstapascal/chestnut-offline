module.exports = (app) => {
	const Auth = require('../controllers/auth.controller');
	const router = require('express').Router();

	// Encrypt text
	router.post('/signup', Auth.signup);

	// Decrypt text
	router.post('/login', Auth.login);

	app.use('/api', router);
};
