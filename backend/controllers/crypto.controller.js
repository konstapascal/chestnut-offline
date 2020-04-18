const forge = require('node-forge');
const pki = forge.pki;

// Encrypt text
exports.encryptText = (req, res) => {
	// Get request body values
	const text = req.body.text;
	const pemPublicKey = req.body.publicKey;

	// Validate request
	if (!text || !pemPublicKey) {
		return res.status(400).json({
			status: 'Error',
			message: 'Both text and publicKey are required fields!',
		});
	}

	// Convert PEM format key to forge key and encrypt the encoded string
	const publicKey = pki.publicKeyFromPem(pemPublicKey);
	const encryptedText = forge.util.encode64(publicKey.encrypt(text));

	res.status(200).json({ encryptedText });
};

// Decrypt text
exports.decryptText = (req, res) => {
	// Get encrypted text and decode it
	const encryptedText = forge.util.decode64(req.body.encryptedText);
	const pemPrivateKey = req.body.privateKey;

	// Validate request
	if (!encryptedText || !pemPrivateKey) {
		return res.status(400).json({
			status: 'Error',
			message: 'Both text and private are required fields!',
		});
	}

	// Convert PEM format key to forge key and decrypt the string
	const privateKey = pki.privateKeyFromPem(pemPrivateKey);
	const text = privateKey.decrypt(encryptedText);

	res.status(200).json({ text });
};
