const jwt = require('jsonwebtoken');
const config = require('../config/secret.token');

// Function that will check for valid token
const checkToken = (req, res, next) => {
	// Store token in variable
	let requestToken =
		req.headers['x-access-token'] || req.headers['authorization'];

	// Check if token was provided in request header
	if (!requestToken) {
		return res.status(403).json({
			status: 'Forbidden',
			message: 'Provide valid token to use protected route!',
		});
	}

	// Remove Bearer from string if there is one
	if (requestToken.startsWith('Bearer ')) {
		requestToken = requestToken.slice(7, requestToken.length);
	}

	// If token is provided, verify it
	if (requestToken) {
		jwt.verify(requestToken, config.secret, (err, decodedData) => {
			if (err) {
				return res.status(401).json({
					status: 'Unauthorized',
					message: 'Token is not valid!',
				});
			} else {
				res.locals.decodedData = decodedData;
				next();
			}
		});
	}
};

module.exports = {
	checkToken: checkToken,
};
