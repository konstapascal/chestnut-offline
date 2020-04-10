const db = require('../models/db.index');
const User = db.user;
const Keypair = db.keypair;

// Get one user by id
exports.getUser = (req, res) => {
	const id = req.params.id;

	User.findByPk(id)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({
					status: 'Error',
					message: `User with id ${id} could not be found!`,
				});
			}
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: `Error retrieving user with id ${id}. Try again later.`,
			});
		});
};

// Get all users
exports.getAllUsers = (req, res) => {
	User.findAll()
		.then((users) => {
			if (users == 0) {
				res.status(404).json({
					status: 'Error',
					message: 'No users to retrieve.',
				});
			}
			if (users) {
				res.status(200).json(users);
			}
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occurred while retrieving users.',
			});
		});
};

// Delete user by ID
exports.deleteUser = (req, res, next) => {
	const id = req.params.id;

	function doesUserExist(id) {
		return User.count({ where: { id: id } }).then((count) => {
			if (count != 0) {
				return true;
			}
			return false;
		});
	}

	doesUserExist(id).then((userExists) => {
		if (userExists) {
			Keypair.destroy({ where: { UserID: id } });
			User.destroy({ where: { ID: id } });
			res.status(200).json({
				status: 'Success',
				message: `User with id of ${id} was deleted successfully!`,
			});
		} else {
			res.status(404).json({
				status: 'Error',
				message: `User with id of ${id} does not exist!`,
			});
		}
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
		res.status(400).json({
			status: 'Error',
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
		.then((updated) => {
			if (updated) {
				res.status(200).json({
					status: 'Success',
					message: 'User was updated successfully.',
				});
			} else {
				res.status(404).json({
					status: 'Error',
					message: `User with id ${id} was not found!.`,
				});
			}
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: `Error updating user with id ${id} Try again later!`,
			});
		});
};
