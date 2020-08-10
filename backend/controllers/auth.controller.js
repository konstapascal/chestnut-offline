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
			status: '400 - Bad Request',
			message:
				'All fields are required and must be filled (username, password, email).',
		});
	}

	// Queries against DB to check for entries
	const usernameExists = await User.findOne({ where: { Username: username } });
	const emailExists = await User.findOne({ where: { Email: email } });

	// Check DB if user, email or both exist
	if (usernameExists && emailExists) {
		return res.status(422).json({
			status: '422 - Unprocessable Entity',
			message: 'Both username and email already exist.',
		});
	} else if (usernameExists) {
		return res.status(422).json({
			status: '422 - Unprocessable Entity',
			message: 'Username already exists.',
		});
	} else if (emailExists) {
		return res.status(422).json({
			status: '422 - Unprocessable Entity',
			message: 'Email already exists.',
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
			res.status(201).json(
				{
					status: '201 - Created',
					message: `User ${username} created successfully.`,
				},
				[
					{
						self: {
							method: 'POST',
							description: 'Signup',
							href: '/api/signup',
						},
					},
					{
						method: 'POST',
						description: 'Login',
						href: '/api/login',
					},
					{
						method: 'POST',
						description: 'Encrypt string using the provided public key.',
						href: '/api/encrypt',
					},
					{
						method: 'POST',
						description:
							'Decrypt cipher string using the provided private key.',
						href: '/api/decrypt',
					},
				]
			);
		})
		.catch((err) => {
			res.status(500).json({
				status: '500 - Internal Server Error',
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
		return res.status(400).json({
			status: '400 - Bad Request',
			message: 'Both username and password are required fields.',
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
					status: '404 - Not Found',
					message: 'Username not found.',
				});
			}

			// Check if password matches with hashed pass in DB
			const passwordIsValid = bcrypt.compareSync(password, user.Password);

			if (!passwordIsValid) {
				return res.status(422).json({
					status: '422 - Unprocessable Entity',
					message: 'Invalid Password.',
				});
			}

			// Create unique for user jwt with stored values of id, isAdmin
			const token = jwt.sign(
				{ id: user.ID, username: user.Username, isAdmin: user.IsAdmin },
				config.secret,
				{ expiresIn: '12h' }
			);

			if (isUserAdmin) {
				// Send back response with token on successful login
				res.status(200).json(
					{
						status: '200 - OK',
						message: 'Login successful and token has been issued.',
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
								'Get all keys, public and private, of currently logged in user.',
							href: '/api/keys/users/me',
						},
						{
							method: 'GET',
							description:
								'Get all public keypairs and usernames of all registered users.',
							href: '/api/keys',
						},
						{
							method: 'DELETE',
							description: 'Delete currently logged in user.',
							href: '/api/users/me',
						},
						{
							method: 'POST',
							description: 'Encrypt string using the provided public key.',
							href: '/api/encrypt',
						},
						{
							method: 'POST',
							description:
								'Decrypt cipher string using the provided private key.',
							href: '/api/decrypt',
						},
					]
				);
			} else if (!isUserAdmin) {
				res.status(200).json(
					{
						status: '200 - OK',
						message: 'Login successful and token has been issued.',
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
							method: 'DELETE',
							description: 'Delete currently logged in user.',
							href: '/api/users/me',
						},
						{
							method: 'POST',
							description: 'Encrypt string using the provided public key.',
							href: '/api/encrypt',
						},
						{
							method: 'POST',
							description:
								'Decrypt cipher string using the provided private key.',
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
