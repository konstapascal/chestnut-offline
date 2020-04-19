// HATEOAS API root
exports.root = (req, res) => {
	// Return available API endpoints to the public
	res.status(200).json({
		links: [
			{
				method: 'POST',
				description: 'Login',
				href: '/api/login',
			},
			{
				method: 'POST',
				description: 'Signup',
				href: '/api/register',
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
		],
	});
};
