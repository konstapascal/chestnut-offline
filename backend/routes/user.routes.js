module.exports = (app) => {
	const User = require('../controllers/user.controller');
	const router = require('express').Router();
	const jwtMiddleware = require('../middlewares/check.token');

	// Retrieve a single users info by id
	router.get('/:id', jwtMiddleware.checkToken, User.getUser);

	// Get all users and their info, admin only
	router.get('/', jwtMiddleware.checkToken, User.getAllUsers);

	// Delete currently logged in user
	router.delete('/me', jwtMiddleware.checkToken, User.delete);

	// Delete user by id, admin only
	router.delete('/:id', jwtMiddleware.checkToken, User.deleteByID);

	// Update an users info by id, admin only
	router.patch('/:id', jwtMiddleware.checkToken, User.updateUser);

	app.use('/api/users', router);
};
