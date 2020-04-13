const jwt = require('jsonwebtoken');
const config = require('../config/secret.token');

const checkToken = (req, res, next) => {
	// Store token in variable
	let requestToken =
		req.headers['x-access-token'] || req.headers['authorization'];

	// Remove Bearer from string if there is one
	if (requestToken.startsWith('Bearer ')) {
		requestToken = requestToken.slice(7, token.length);
	}

	// Check if token was provided
	if (!requestToken) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'Auth token is not supplied. You have no access!',
		});
	}

	// If token is provided, verify it
	if (requestToken) {
		jwt.verify(requestTokens, config.secret, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					status: 'Unauthorized',
					message: 'Token is not valid!',
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	}
};

module.exports = {
	checkToken: checkToken,
};
