const db = require('../models/db.index');
const User = db.user;
const Op = db.Sequelize.Op;

// Signup to create new user
exports.signup = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	// Validate request
	if (!username || !password || !email) {
		res.status(400).json({
			status: 'Error',
			message:
				'All required fields (username, password, email) must be filled!',
		});
		return;
	}

	// Queries against DB to check for entries
	const checkUsername = await User.findOne({ where: { Username: username } });
	const checkEmail = await User.findOne({ where: { Email: email } });

	// Check DB if user, email or both exist
	if (checkUsername && checkEmail) {
		res.status(400).json({
			status: 'Error',
			message: 'Both username and email already taken!',
		});
		return;
	} else if (checkUsername) {
		res.status(400).json({
			status: 'Error',
			message: 'Username already taken!',
		});
		return;
	} else if (checkEmail) {
		res.status(400).json({
			status: 'Error',
			message: 'Email already taken!',
		});
		return;
	}

	// Create a keypair schema
	const UserSchema = {
		Username: username,
		Password: password,
		Email: email,
		isAdmin: 0,
	};

	// Run query to save schema in the database
	User.create(UserSchema)
		.then(() => {
			res.status(200).json({
				status: 'Success',
				message: `User ${username} created successfully`,
			});
		})
		.catch(() => {
			res.status(500).json({
				status: 'Error',
				message: `Error occurred while creating user ${username}. Try again later.`,
			});
		});
};

exports.login = (req, res) => {
	res.json({ message: 'Login not yet implemented' });
};
