const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/db.index');

const app = express();

var corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync tables in db with tables created in models, remove 'force: true' to not drop existing tables on sync
db.sequelize.sync({ force: true }).then(() => {
	// dummy user data
	db.user.create({
		Username: 'kopaa17',
		Password: 'password1',
		Email: 'konstapascal@gmail.com',
	});
	db.user.create({
		Username: 'abozar123',
		Password: 'password2',
		Email: 'abozarafz@gmail.com',
	});
	db.user.create({
		Username: 'john',
		Password: 'password3',
		Email: 'johnjohn@gmail.com',
	});

	// dummy keypair data
	db.keypair.create({
		Name: 'RSA Keypair 1',
		Type: 'RSA',
		Length: 512,
		PublicKey:
			'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJD7fPvDqInJH9YQKB6Q/75w6bbcJaR0j3AlDqed8WA0iNzChrPB8uUzksjQmRcrbD30NY+M5Xaii/rWMpqMBzcCAwEAAQ==',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAkPt8+8Ooickf1hAoHpD/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZXRHRcbIHAsPnFTqxcuGuJC4D2gonqJhqpwekHQvvb6+wcUMDFoOVmHFxBNPNpqayyo1BlTfo1KpnKrca3xBAiEA86DkBQV2+0MfvWWWugAULYc7M1cFwDwTp5qRo3eOsbMCIQCYWDkMKm0VXZAsiAYcvgcmEFPsoWnYkC84SoSusFEqbQIgHU7hn2kE4z0z+EjcVQvlYYS/LnHtky6m/qatloivddkCIBkd6oHj+Mod++groP5aIimXZY7M6fuHghGAz7FRZoBdAiAWhP47gYxGuEDcOkPNaTfecejRcJM1y88KRtLW2xXSVg==',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'AES Keypair',
		Type: 'AES',
		Length: 128,
		PublicKey:
			'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJD7fPvDqInJH9YQKB6Q/75w6bbcJaR0j3AlDqed8WA0iNzChrPB8uUzksjQmRcrbD30NY+M5Xaii/rWMpqMBzcCAwEAAQ==',
		UserID: 1,
	});

	db.keypair.create({
		Name: 'KeypairName',
		Type: 'RSA',
		Length: 1024,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4NvPnWG52xbVfVU05v/wrnDGq706AADKaLKp7fnIdseBwIDAQAB',
		PrivateKey:
			'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIEks63yiOUIEojalNQjpyz1+fZLyXZWwCc0Lpu1zcW2X+ItFTPyLv3YjwLVG0BsVHzCo0DZqnxe3t7vZ2f5T21Sc9PxMEcbnik9+hvmM1zSkTFyR/xAuRXUDHIzZfpHg28+dYbnbFtV9VTTm//CucMarvToAAMposqnt+ch2x4HAgMBAAECgYBtV+buU9kGmnQe/XtftqQ4VDgFCpwUH1VonC0OV7tXOJgsh2FZbyfMdEx56He/bzmFvMK/CMzpquXnOiqChTtyrO0yc5nUUQ56Mqx1JYJwBOvKmE2+PlXRxZUMzm9K9cpRefmThwcLDTmLiPwOl0l1Cbw1CtKZ8b1PV1Z6cFrMMQJBAM+bxeCsP297LhUeE+JKj2WSBpy7X7M573QsVLKD7Nyvr3FRuu1uMki81LG++RJnDFGYTlMzbs+QZfJgxq5iqi8CQQCfPtQoDXstXMvwgJLWIZs6m9JlpFmn/et+rRoIJrMqxrlYfI8InqMM7pHh98la3dQsO2cw9Z4ug62c6Zyks0upAkBtKm7xhgFRQIdpyUgRXL1sXk2lyo029Abqooji2aYKIUNypdRSFvjP8KMy18WmnJMIsLq22zuwXzCMM8ElX3I3AkB3IYWNwSgZM4bOESHIV7PNEK1BpMX9yxPV3KHQ30LCCZC3BdfrVuIb1o4EQl68P59ux7HXCqifm5rR/GJXRFqhAkAw1aZGnKK+2wtYMRcDRQr3olyM/KW1Vqf8zjffNPo/YNl1qxkhCAQbvxEQs6CKCOA8Ax58VBr0BVo96zQ4MYk/',
		UserID: 2,
	});
	db.keypair.create({
		Name: 'Keypair1',
		Type: 'AES',
		Length: 256,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4NvPnWG52xbVfVU05v/wrnDGq706AADKaLKp7fnIdseBwIDAQAB',
		UserID: 2,
	});

	db.keypair.create({
		Name: 'Keypair2',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4NvPnWG52xbVfVU05v/wrnDGq706AADKaLKp7fnIdseBwIDAQAB',
		PrivateKey:
			'MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAkPt8+8Ooickf1hAoHpD/vnDpttwlpHSPcCUOp53xYDSI3MKGs8Hy5TOSyNCZFytsPfQ1j4zldqKL+tYymowHNwIDAQABAkAZZXRHRcbIHAsPnFTqxcuGuJC4D2gonqJhqpwekHQvvb6+wcUMDFoOVmHFxBNPNpqayyo1BlTfo1KpnKrca3xBAiEA86DkBQV2+0MfvWWWugAULYc7M1cFwDwTp5qRo3eOsbMCIQCYWDkMKm0VXZAsiAYcvgcmEFPsoWnYkC84SoSusFEqbQIgHU7hn2kE4z0z+EjcVQvlYYS/LnHtky6m/qatloivddkCIBkd6oHj+Mod++groP5aIimXZY7M6fuHghGAz7FRZoBdAiAWhP47gYxGuEDcOkPNaTfecejRcJM1y88KRtLW2xXSVg==',
		UserID: 3,
	});
	db.keypair.create({
		Name: 'Keypair3',
		Type: 'AES',
		Length: 128,
		PublicKey:
			'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBJLOt8ojlCBKI2pTUI6cs9fn2S8l2VsAnNC6btc3Ftl/iLRUz8i792I8C1RtAbFR8wqNA2ap8Xt7e72dn+U9tUnPT8TBHG54pPfob5jNc0pExckf8QLkV1AxyM2X6R4NvPnWG52xbVfVU05v/wrnDGq706AADKaLKp7fnIdseBwIDAQAB',
		UserID: 3,
	});
});

// Requiring all routes
require('./routes/user.routes')(app);
require('./routes/keypair.routes')(app);
require('./routes/crypto.routes')(app);
require('./routes/auth.routes')(app);

// Set port and listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
