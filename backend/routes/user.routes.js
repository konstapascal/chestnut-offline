module.exports = (app) => {
	const User = require('../controllers/user.controller');
	const router = require('express').Router();

	// Retrieve a single user with id
	router.get('/:id', User.getUser);

	// Retrieve all users
	router.get('/', User.getAllUsers);

	// Delete an user with id
	router.delete('/:id', User.deleteUser);

	// Update an user with id
	router.patch('/:id', User.updateUser);

	app.use('/api/users', router);
};
