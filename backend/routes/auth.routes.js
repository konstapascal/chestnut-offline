module.exports = (app) => {
	const Auth = require('../controllers/auth.controller');
	const Root = require('../controllers/api.root.controller');
	const router = require('express').Router();

	// API root
	router.get('/', Root.root);

	// Sign up
	router.post('/signup', Auth.signup);

	// Log in
	router.post('/login', Auth.login);

	app.use('/api', router);
};
