const forge = require('node-forge');
const pki = forge.pki;

// Encrypt text
exports.encryptText = (req, res) => {
	// Get request body values
	const decryptedText = req.body.text;
	const pemPublicKey = req.body.publicKey;

	const url = req.protocol + '://' + req.headers.host;

	// Validate request
	if (!decryptedText || !pemPublicKey) {
		return res.status(400).json({
			status: '400 - Bad Request',
			message: 'Both fields are required and must be filled (text, publicKey).',
		});
	}

	// Convert PEM format key to forge key and encrypt the encoded string
	const publicKey = pki.publicKeyFromPem(pemPublicKey);
	const encryptedText = forge.util.encode64(publicKey.encrypt(decryptedText));

	res.status(200).json({ status: '200 - OK', encryptedText }, [
		{
			self: {
				method: 'POST',
				description: 'Encrypt string using the provided public key.',
				href: url + '/api/encrypt',
			},
		},
		{
			method: 'POST',
			description: 'Decrypt cipher string using the provided private key.',
			href: url + '/api/decrypt',
		},
	]);
};

// Decrypt text
exports.decryptText = (req, res) => {
	// Get encrypted text and decode it
	const encryptedText = forge.util.decode64(req.body.encryptedText);
	const pemPrivateKey = req.body.privateKey;

	const url = req.protocol + '://' + req.headers.host;

	// Validate request
	if (!encryptedText || !pemPrivateKey) {
		return res.status(400).json({
			status: '400 - Bad Request',
			message:
				'Both fields are required and must be filled (encryptedText, privateKey).',
		});
	}

	// Convert PEM format key to forge key and decrypt the string
	const privateKey = pki.privateKeyFromPem(pemPrivateKey);
	const decryptedText = privateKey.decrypt(encryptedText);

	res.status(200).json({ status: '200 - OK', decryptedText }, [
		{
			self: {
				method: 'POST',
				description: 'Decrypt cipher string using the provided private key.',
				href: url + '/api/decrypt',
			},
		},
		{
			method: 'POST',
			description: 'Encrypt string using the provided public key.',
			href: url + '/api/encrypt',
		},
	]);
};
