const db = require('../models/db.index');
const User = db.user;
const Keypair = db.keypair;
const { Op } = require('sequelize');

// Get one users info by id
exports.getUser = (req, res) => {
	const userID = req.params.id;
	const isUserAdmin = res.locals.decodedData.isAdmin;

	const url = req.protocol + '://' + req.headers.host;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: '403 - Forbidden',
			message:
				'You do not have the necessary permissions to access this route.',
		});
	}

	User.findAll({ where: { ID: userID } })
		.then((user) => {
			if (user) {
				res.status(200).json({ status: '200 - OK', user }, [
					{
						self: {
							method: 'GET',
							description: 'Get individual user by id.',
							href: url + '/api/users/' + userID,
						},
					},
					{
						method: 'PATCH',
						description: 'Update users details by id.',
						href: url + '/api/users/' + userID,
					},
					{
						method: 'DELETE',
						description: 'Delete user by id.',
						href: url + '/api/users/' + userID,
					},
				]);
			} else {
				res.status(404).json({
					status: '404- Not Found',
					message: `User with id ${userID} was not found.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: `Error retrieving user with id ${userID}: ` + err,
			});
		});
};

// Get all users and their info, admin only
exports.getAllUsers = (req, res) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;
	const adminID = res.locals.decodedData.id;

	const url = req.protocol + '://' + req.headers.host;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: '403 - Forbidden',
			message:
				'You do not have the necessary permissions to access this route.',
		});
	}

	User.findAll({
		where: {
			ID: {
				[Op.ne]: adminID,
			},
		},
	})
		.then((users) => {
			// Some code is commented out, alternative implementation
			let getUserArray = [];
			// let deleteUserArray = [];
			// let patchUserArray = [];

			users.forEach((user) => {
				getUserArray.push({
					method: 'GET',
					description: `Get individual user with id ${user.ID}`,
					href: url + '/api/users/' + user.ID,
				});
				/* deleteUserArray.push({
					method: 'DELETE',
					description: `Delete individual user with id ${user.ID}`,
					href: url + '/api/users/' + user.ID,
				});
				patchUserArray.push({
					method: 'PATCH',
					description: `Update individual user with id ${user.ID}`,
					href: url + '/api/users/' + user.ID,
				}); */
			});

			if (users) {
				res.status(200).json({ status: '200 - OK', users }, [
					{
						self: {
							method: 'GET',
							description: 'Get all registered users info.',
							href: url + '/api/users',
						},
					},
					{ getUserByID: getUserArray },
				]);
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: 'Error occurred while retrieving users: ' + err,
			});
		});
};

// Delete currently logged in user
exports.delete = async (req, res, next) => {
	const userID = res.locals.decodedData.id;

	const url = req.protocol + '://' + req.headers.host;

	deleteKeys = await Keypair.destroy({ where: { UserID: userID } });
	deleteUser = await User.destroy({ where: { ID: userID } });

	// Check if user exists
	if (deleteUser == 0) {
		return res.status(404).json({
			status: '404 - Not Found',
			message: 'User was not found.',
		});
		// Delete user and his keys
	} else if (deleteKeys && deleteUser) {
		return res.status(200).json(
			{
				status: '200 - OK',
				message: 'User and associated keys deleted successfully.',
			},
			[
				{
					self: {
						method: 'DELETE',
						description: 'Delete currently logged in user.',
						href: url + '/api/users/me',
					},
				},
			]
		);
	}
};

// Delete user by id, admin only
exports.deleteByID = (req, res, next) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;
	const userID = req.params.id;

	const url = req.protocol + '://' + req.headers.host;

	// Function to check if an user with id exists
	function doesUserExist(userID) {
		return User.count({ where: { ID: userID } }).then((count) => {
			if (count != 0) {
				return true;
			}
			return false;
		});
	}

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: '403 - Forbidden',
			message:
				'You do not have the necessary permissions to access this route.',
		});
	}

	// Delete user and their keys
	doesUserExist(userID)
		.then((userExists) => {
			if (userExists) {
				Keypair.destroy({ where: { UserID: userID } });
				User.destroy({ where: { ID: userID } });
				res.status(200).json(
					{
						status: '200 - OK',
						message: `User with id of ${userID} was deleted successfully!`,
					},
					[
						{
							self: {
								method: 'DELETE',
								description: 'Delete user by id.',
								href: url + '/api/users/' + userID,
							},
						},
					]
				);
			} else {
				res.status(404).json({
					status: '404 - Not Found',
					message: `User with id of ${userID} was not exist.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message:
					`Error occurred while deleting user with id of ${userID}: ` + err,
			});
		});
};

// Update an users info by id, admin only
exports.updateUser = async (req, res) => {
	const isUserAdmin = res.locals.decodedData.isAdmin;

	const userID = req.params.id;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const isAdmin = req.body.isAdmin;

	const url = req.protocol + '://' + req.headers.host;

	// Check if user making request is admin
	if (isUserAdmin == false) {
		return res.status(403).json({
			status: '403 - Forbidden',
			message:
				'You do not have the necessary permissions to access this route.',
		});
	}

	// Validate request
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({
			status: '400 - Bad Request',
			message:
				'You must provide atleast 1 field to update (username, email, password, isAdmin) in the body of the request.',
		});
	}

	// Check if user exists
	const userExists = await User.findOne({ where: { ID: userID } });

	if (!userExists) {
		return res.status(404).json({
			status: '404 - Not Found',
			message: `User with id ${userID} was not found.`,
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
			where: { ID: userID },
		}
	)
		.then((updated) => {
			if (updated) {
				res.status(200).json(
					{
						status: '200 - OK',
						message: 'User was updated successfully.',
					},
					[
						{
							self: {
								method: 'PATCH',
								description: 'Update details of user with id ' + userID,
								href: url + '/api/users/' + userID,
							},
						},
					]
				);
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: '500 - Internal Server Error',
				message: `Error updating user with id ${userID}: ` + err,
			});
		});
};
