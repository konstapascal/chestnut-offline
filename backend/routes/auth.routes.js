module.exports = (app) => {
	const Auth = require('../controllers/auth.controller');
	const router = require('express').Router();

	// Sign up
	router.post('/signup', Auth.signup);

	// Log in
	router.post('/login', Auth.login);

	app.use('/api', router);
};
