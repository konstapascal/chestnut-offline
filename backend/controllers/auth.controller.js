const db = require('../models/db.index');
const User = db.users;
const Op = db.Sequelize.Op;

// Signup to create new user
exports.signup = (req, res) => {
	res.json({ message: 'Signup not yet implemented' });
};

// Check for DB entry
exports.login = (req, res) => {
	res.json({ message: 'Login not yet implemented' });
};
