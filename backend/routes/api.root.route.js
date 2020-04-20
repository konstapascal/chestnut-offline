module.exports = (app) => {
	const Root = require('../controllers/api.root.controller');
	const router = require('express').Router();

	// API root
	router.get('/', Root.root);

	app.use('/api', router);
};
