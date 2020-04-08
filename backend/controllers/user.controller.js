const db = require('../models/db.index');
const User = db.user;

// Get one user by id
exports.getUser = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
		.then((data) => {
			if (data) {
				res.status(200).send(data);
			} else {
				res.status(404).send({
					message: 'User with id ' + id + ' could not be found!',
				});
			}
		})
		.catch(() => {
			res.status(500).send({
				message: 'Error retrieving user with id ' + id + '. Try again later.',
			});
		});
};

// Get all users
exports.getAllUsers = (req, res) => {
	User.findAll()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch(() => {
			res.status(500).send({
				message: 'Error occurred while retrieving users.',
			});
		});
};

// Delete user by ID
exports.deleteUser = (req, res) => {
	const id = req.params.id;

	User.destroy({
		where: { ID: id },
	})
		.then((data) => {
			if (data) {
				res.status(200).send({
					message: 'User was deleted successfully!',
				});
			} else {
				res.status(404).send({
					message: 'User with id ' + id + ' was not found!',
				});
			}
		})
		.catch(() => {
			res.status(500).send({
				message: 'Could not delete user with id ' + id,
			});
		});
};

// Update user by id
exports.updateUser = (req, res) => {
	const id = req.params.id;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const isAdmin = req.body.isAdmin;

	// Validate request
	if (Object.keys(req.body).length === 0) {
		res.status(400).send({
			message:
				'You must provide atleast 1 field to update (username, email, password, isAdmin)',
		});
		return;
	}

	User.update(
		{
			Username: username,
			Email: email,
			Password: password,
			IsAdmin: isAdmin,
		},
		{
			where: { ID: id },
		}
	)
		.then((data) => {
			if (data == 1) {
				res.status(200).send({
					message: 'User was updated successfully.',
				});
			} else {
				res.status(404).send({
					message: 'User with id ' + id + ' was not found! Try another one.',
				});
			}
		})
		.catch(() => {
			res.status(500).send({
				message: 'Error updating user with id ' + id,
			});
		});
};
