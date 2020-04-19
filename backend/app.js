const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db.index');
const bcrypt = require('bcrypt');

const app = express();

const hateoasLinker = require('express-hateoas-links');

const corsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(hateoasLinker);

// Sync tables in db with tables created in models, remove 'force: true' to not drop existing tables on sync
db.sequelize.sync({ force: true }).then(() => {
	// Dummy user data
	db.user.create({
		Username: 'test1',
		Password: bcrypt.hashSync('test1', 12),
		Email: 'test1@gmail.com',
		IsAdmin: 1,
	});
	db.user.create({
		Username: 'test2',
		Password: bcrypt.hashSync('test2', 12),
		Email: 'test2@gmail.com',
		IsAdmin: 1,
	});
	db.user.create({
		Username: 'test3',
		Password: bcrypt.hashSync('test3', 12),
		Email: 'test3@gmail.com',
	});

	// Dummy keypair data
	db.keypair.create({
		Name: 'RSA Keypair 1',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJD7fPvDqInJH9YQKB6Q/75w6bbcJaR0j3AlDqed8WA0iNzChrPB8uUzksjQmRcrbD30NY+M5Xaii/rWMpqMBzcCAwEAAQ==',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZXRHRcbIHAs',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'Keypair',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJD7fPvDqInJH9YQKB6Q/75w6bbcJaR0j3AlDqed8WA0iNzChrPB8uUzksjQmRcrbD30NY+M5Xaii/rWMpqMBzwEAAQ==',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZXRHRcbIHAs',
		UserID: 1,
	});

	db.keypair.create({
		Name: 'Keypair Name',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA2S8l2VsAnNC6bn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4NvPnWG52xbVfVU05v/wrnDGq706AADKaLKpQAB',
		PrivateKey:
			'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAqxkhCAQbvxEQs6CKCOA8Ax58VBr0BVo96zQ4MYk21321321dsadasdadasd8asn98das90d8as0n8da9sn8das/',
		UserID: 2,
	});
	db.keypair.create({
		Name: 'Keypair 1',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4DAQAB',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZXRHRcbIHAs',
		UserID: 2,
	});

	db.keypair.create({
		Name: 'Keypair 2',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i78dsaas99sa898ds9a8dsa89daAB',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wFPsoWnYkC84SoSusFEqbQIgHU7hn2kE4z0z+EjcVQvlYYS/LnHtky6m/qatloivddkCIBkd6oHj+ModXZY7M2xXSVg==',
		UserID: 3,
	});
	db.keypair.create({
		Name: 'Keypair 3',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+UB',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZIHAs',
		UserID: 3,
	});
});

// Requiring all routes
require('./routes/api.root.route')(app);
require('./routes/auth.routes')(app);
require('./routes/crypto.routes')(app);
require('./routes/user.routes')(app);
require('./routes/keypair.routes')(app);

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
