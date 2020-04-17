const db = require('../models/db.index');
const User = db.user;
const Keypair = db.keypair;
var hal = require('hal');

// Get one users info by id
exports.getUser = (req, res) => {
	const userID = req.params.id;
	const isUserAdmin = res.locals.decodedData.isAdmin;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'You must be an admin to access this route!',
		});
	}

	User.findAll({ where: { ID: userID } })
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({
					status: 'Error',
					message: `User with id ${userID} could not be found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: `Error retrieving user with id ${userID}: ` + err,
			});
		});
};

// Get all users and their info, admin only
exports.getAllUsers = (req, res) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;
	const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'You must be an admin to access this route!',
		});
	}

	User.findAll()
		.then((users) => {
			const selfLink = {
				method: req.method,
				href: fullUrl,
			};
			let getUserArray = [];
			let deleteUserArray = [];
			let patchUserArray = [];

			users.forEach((user) => {
				getUserArray.push({
					method: 'GET',
					description: 'Get individual user with id ' + user.ID,
					href: fullUrl + user.ID,
				});
				deleteUserArray.push({
					method: 'DELETE',
					description: 'Delete individual user with id ' + user.ID,
					href: fullUrl + user.ID,
				});
				patchUserArray.push({
					method: 'PATCH',
					description: 'Update individual user with id ' + user.ID,
					href: fullUrl + user.ID,
				});
			});

			if (users) {
				res
					.status(200)
					.json({ users }, [
						{ self: selfLink },
						{ getUser: getUserArray },
						{ deleteUser: deleteUserArray },
						{ patchUser: patchUserArray },
					]);
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occurred while retrieving users: ' + err,
			});
		});
};

// Delete currently logged in user
exports.delete = async (req, res, next) => {
	const userID = res.locals.decodedData.id;

	function isUserLastAdmin(id) {
		return User.count({ where: { id: id } }).then((count) => {
			if (count != 0) {
				return true;
			}
			return false;
		});
	}

	deleteKeys = await Keypair.destroy({ where: { UserID: userID } });
	deleteUser = await User.destroy({ where: { ID: userID } });

	// Check if user exists
	if (deleteUser == 0) {
		return res.status(404).json({
			status: 'Error',
			message: 'User cannot be found!',
		});
		// Delete user and his keys
	} else if (deleteKeys && deleteUser) {
		return res.status(200).json({
			status: 'Success',
			message: 'User and all keys have been deleted!',
		});
	}
};

// Delete user by id, admin only
exports.deleteByID = (req, res, next) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;
	const userID = req.params.id;

	// Function to check if an user with id exists
	function doesUserExist(userID) {
		return User.count({ where: { userID: userID } }).then((count) => {
			if (count != 0) {
				return true;
			}
			return false;
		});
	}

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'You must be an admin to access this route!',
		});
	}

	// Delete user and their keys
	doesUserExist(userID)
		.then((userExists) => {
			if (userExists) {
				Keypair.destroy({ where: { UserID: userID } });
				User.destroy({ where: { ID: userID } });
				res.status(200).json({
					status: 'Success',
					message: `User with id of ${userID} was deleted successfully!`,
				});
			} else {
				res.status(404).json({
					status: 'Error',
					message: `User with id of ${userID} does not exist!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message:
					`Error occurred while deleting user with id of ${userID}: ` + err,
			});
		});
};

// Update an users info by id, admin only
exports.updateUser = async (req, res) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;

	const id = req.params.id;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const isAdmin = req.body.isAdmin;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'You must be an admin to access this route!',
		});
	}

	// Validate request
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
			status: 'Error',
			message:
				'You must provide atleast 1 field to update (username, email, password, isAdmin)',
		});
	}

	// Check if user exists
	const userExists = await User.findOne({ where: { ID: id } });

	if (!userExists) {
		return res.status(404).json({
			status: 'Error',
			message: `User with id ${id} was not found!`,
		});
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
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: `Error updating user with id ${id}: ` + err,
			});
		});
};
