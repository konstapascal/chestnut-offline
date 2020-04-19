const db = require('../models/db.index');
const jwt = require('jsonwebtoken');
const config = require('../config/secret.token');
const User = db.user;
var bcrypt = require('bcrypt');

// Signup to create new user
exports.signup = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	// Validate request
	if (!username || !password || !email) {
		return res.status(400).json({
			status: 'Error',
			message:
				'All required fields (username, password, email) must be filled!',
		});
	}

	// Queries against DB to check for entries
	const usernameExists = await User.findOne({ where: { Username: username } });
	const emailExists = await User.findOne({ where: { Email: email } });

	// Check DB if user, email or both exist
	if (usernameExists && emailExists) {
		return res.status(400).json({
			status: 'Error',
			message: 'Both username and email already taken!',
		});
	} else if (usernameExists) {
		return res.status(400).json({
			status: 'Error',
			message: 'Username already taken!',
		});
	} else if (emailExists) {
		return res.status(400).json({
			status: 'Error',
			message: 'Email already taken!',
		});
	}

	// Create a keypair schema using body values
	const UserSchema = {
		Username: username,
		Password: bcrypt.hashSync(password, 12),
		Email: email,
		isAdmin: 0,
	};

	// Run query to save schema in the database
	User.create(UserSchema)
		.then(() => {
			res.status(200).json(
				{
					status: 'Success',
					message: `User ${username} created successfully`,
				},
				[
					{
						method: 'POST',
						description: 'Login',
						href: '/api/login',
					},
					{
						method: 'POST',
						description: 'Encrypt',
						href: '/api/encrypt',
					},
					{
						method: 'POST',
						description: 'Decrypt',
						href: '/api/decrypt',
					},
				]
			);
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: `Error occurred while creating user ${username}:` + err,
			});
		});
};

exports.login = async (req, res) => {
	// Store body values
	const username = req.body.username;
	const password = req.body.password;

	// Validate request
	if (!username || !password) {
		return res.status(404).json({
			status: 'Error',
			message: 'Both username and password must be provided.',
		});
	}

	const isUserAdmin = await User.findOne({
		where: { Username: username, IsAdmin: true },
	});

	User.findOne({ where: { Username: username } })
		.then((user) => {
			// Check if username exists in the DB
			if (!user) {
				return res.status(404).json({
					status: 'Error',
					message: 'Username not found!',
				});
			}

			// Check if password matches with hashed pass in DB
			const passwordIsValid = bcrypt.compareSync(password, user.Password);

			if (!passwordIsValid) {
				return res.status(404).json({
					status: 'Error',
					message: 'Invalid password!',
				});
			}

			// Create unique for user jwt with stored values of id, isAdmin
			const token = jwt.sign(
				{ id: user.ID, username: user.Username, isAdmin: user.IsAdmin },
				config.secret,
				{ expiresIn: '24h' }
			);

			if (isUserAdmin) {
				// Send back response with token on successfull login
				res.status(200).json(
					{
						status: 'Success',
						message: 'You have logged in and have been issued a token.',
						token: token,
					},
					[
						{
							self: {
								method: 'POST',
								description: 'Login',
								href: '/api/login',
							},
						},
						{
							method: 'GET',
							description: 'Get all registered users info.',
							href: '/api/users',
						},
						{
							method: 'GET',
							description:
								'Get all keys, public and private of currently logged in user.',
							href: '/api/keys/users/me',
						},
						{
							method: 'GET',
							description:
								'Get all public keypairs and usernames of all registered users.',
							href: '/api/keys',
						},
						{
							method: 'POST',
							description: 'Endpoint that will encrypt provided string.',
							href: '/api/encrypt',
						},
						{
							method: 'POST',
							description: 'Endpoint that will decrypt provided cipher.',
							href: '/api/decrypt',
						},
					]
				);
			} else if (!isUserAdmin) {
				res.status(200).json(
					{
						status: 'Success',
						message: 'You have logged in and have been issued a token.',
						token: token,
					},
					[
						{
							self: {
								method: 'POST',
								description: 'Login',
								href: '/api/login',
							},
						},
						{
							method: 'GET',
							description:
								'Get all public keypairs and usernames of all registered users.',
							href: '/api/keys',
						},
						{
							method: 'POST',
							description: 'Endpoint that will encrypt provided string.',
							href: '/api/encrypt',
						},
						{
							method: 'POST',
							description: 'Endpoint that will decrypt provided cipher.',
							href: '/api/decrypt',
						},
					]
				);
			}
		})
		.catch((err) => {
			res.status(500).json({
				status: 'Error',
				message: 'Error occured while logging in: ' + err,
			});
		});
};
