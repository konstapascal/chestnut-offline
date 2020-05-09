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
		IsAdmin: 1,
	});
	db.user.create({
		Username: 'abozar',
		Password: bcrypt.hashSync('abozar', 12),
		Email: 'abozar@gmail.com',
	});
	db.user.create({
		Username: 'konsta',
		Password: bcrypt.hashSync('konsta', 12),
		Email: 'konstapascal@gmail.com',
	});
	db.user.create({
		Username: 'thomas',
		Password: bcrypt.hashSync('thomas', 12),
		Email: 'thomas@gmail.com',
	});

	// Dummy keypair data
	db.keypair.create({
		Name: 'RSA Keypair 1',
		Type: 'RSA',
		Length: 512,
		PublicKey:
			'-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIttStpjRaAjckMG98URR6dF3dzCzU/WTpX+17flc1q6A92AdU2M0PER2OgtQcJ3f4bdg6+6hAGlCfMWyy/1YS0CAwEAAQ==-----END PUBLIC KEY-----',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIIBOQIBAAJBAIttStpjRaAjckMG98URR6dF3dzCzU/WTpX+17flc1q6A92AdU2M 0PER2OgtQcJ3f4bdg6+6hAGlCfMWyy/1YS0CAwEAAQJAWr+oGLzEdJadqELAweOd X6J55VZli7FRNQ/KGEef7UxvU3AO9gQqcSPfMlRBfO/z7LDxKJ81VNY5OD3XZU4w AQIhAMTKRUkRqqx+p0RaXo2HmgVNO5e6bl1JnTp4ZC4u7BgNAiEAtWChU/OO+5ra QRJlV8BtBzVg1JEkaNrp9WsA4AKKBaECIAohl7uRS0YiJx5fwKpspsNLHJxNHs1y ssOF2zJ9e+4pAiAZBBXcLViILUhy9yWRH9Ipz1vmlYovCBqCpdp+CvucYQIgN7rs tu7YrpHyVHpEXKKljB+1Vdv6TmKgX/yAC6jCYgE= -----END RSA PRIVATE KEY----- ',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'RSA Keypair 2',
		Type: 'RSA',
		Length: 1024,
		PublicKey:
			'-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMjRTJuscQ2Eq42PhLqvsiE+/Q yDpmCvKAXwJEWvZGarnni9ax22TCZAhrwgkhuMgS4TdY2x/KucyM+7QMuy7Vvt0G qfXQXHUbP4JWvSmXOdVaEhbpdy8OEkBGWCWdNiSO5bLocCzDK7MpvD8qap+nIGSO xs3H1ehHOwrFQIhE2QIDAQAB -----END PUBLIC KEY----- ',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIICXQIBAAKBgQCMjRTJuscQ2Eq42PhLqvsiE+/QyDpmCvKAXwJEWvZGarnni9ax 22TCZAhrwgkhuMgS4TdY2x/KucyM+7QMuy7Vvt0GqfXQXHUbP4JWvSmXOdVaEhbp dy8OEkBGWCWdNiSO5bLocCzDK7MpvD8qap+nIGSOxs3H1ehHOwrFQIhE2QIDAQAB AoGAJJ6BYwnR4baoyT5meriCk99j5R618G47vmyCl7KnZbNa2lQZzN8fgnIzq3ez j2CoaBrbo7/7qYL9I2JVB9ghHFV8a2OhPh3Vo8G8pHq5gwfiX/t0cYKGQb9u1Wp9 e8RpnJ0IaSzj0fhflw0nGIo3tM1jPxHmIpzBdwA3JRhzKgECQQDd8ob/CQs7CbKK 8ytaAyvCHqeEog95cS2oFKwvdUNEnqqZHPmosynhxTSi/E9EYY61ziAQ3c2qQb/8 r+b1fuOZAkEAoh2JIJfLmzGaddqYKy66ul1ys4gOxBGAb63NBjUMNT1Aer9t6aDd 4JzPh+epAlitVlTwBTczJPKW/Z1H/2EzQQJALbV5+eIp7vGzVIx5/CK1C1h21Yju uOsHJRuEzo1O2j33Emt2OzkSwg10JrDhvkp9MpIN5otXhN3fpTGw1hRY2QJBAIr0 Ygtr0PtvIwQNoAyzex4u5xf3cSCiF8Kh6HB/m70uiUwtNRrh5gyWnFPTP0xhkgHD wA/YZqAuxzkPTR0axYECQQC/JJDnxmVP/jRZG2WIyeWD3HNvbGxeitLuzlbOMrPp 6TP4mxmeC1vWFyCIfA3PPKEwMmS3ylt9Eu3ldkEfJ3Od -----END RSA PRIVATE KEY----- ',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'Keypair test 123',
		Type: 'RSA',
		Length: 2048,
		PublicKey:
			'-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAumXJLkiqVzvNWZmaQTMH SbvMFIn3VXCrutLbf85LHbqg6G+Zwwy0daWr8flTu6K/LagP0z3HAM4l1hR8vOva jrG3x86teAf6j4QcceOgtaXd3rb8AC2PmdSVhzMfUAnD3/aVaebz3GJLaBH3uiab n6q9nvrrNh2bKO9y+yHnykRol7VEtGGanKU3aKVWO0tjjr8CWvl8duk3tO+Tp+MW N60NY9Pfd2l2/ZvGu8olIdrkxetpWsMoq57XLInwOpLagex+lKqcVjvIGOpMi4bq K12WQN7GjC7a/WrDTW8RaGlwyT5sEvcFcbbyu13Dz+kEQDmhcCqdXOIoAJuc+G7S pwIDAQAB -----END PUBLIC KEY----- ',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEAumXJLkiqVzvNWZmaQTMHSbvMFIn3VXCrutLbf85LHbqg6G+Z wwy0daWr8flTu6K/LagP0z3HAM4l1hR8vOvajrG3x86teAf6j4QcceOgtaXd3rb8 AC2PmdSVhzMfUAnD3/aVaebz3GJLaBH3uiabn6q9nvrrNh2bKO9y+yHnykRol7VE tGGanKU3aKVWO0tjjr8CWvl8duk3tO+Tp+MWN60NY9Pfd2l2/ZvGu8olIdrkxetp WsMoq57XLInwOpLagex+lKqcVjvIGOpMi4bqK12WQN7GjC7a/WrDTW8RaGlwyT5s EvcFcbbyu13Dz+kEQDmhcCqdXOIoAJuc+G7SpwIDAQABAoIBAQCihs38hW/B0Gsl jUFrSEs6h31TC1mWLkAPDnxF3GKy8WAMTAMOh61yR5q9ymCwYx+/d6MU1fEHSrjD CeoZ8K0JbvyIRDYNSye2q8MBqzEeMhpbb8IbhZ6Iy0v2LyVGbL1WM3Pke3R23V5S yBfxQGjBt+bPEIq3DOmVr/PZ9Z5eRfflUbzkG+DpAsrxeeBHhfDnCBbEQtrhGG8r 7XBG+myC1pMjbltLy81zmZJ+UmR56z0V1M8wwwmiQHcdqdInABb58uxLeBeRtbU6 111ots13dw8D848hAgA2d1VAhsAV4gbRGK6UToqufHaRSeHDfb8aEVx4dNbV3xlq QNCnK2fBAoGBAPdu+KaxJAKDmpiyfQuMLiSi+datlurWHcqSBVA01GyvQj8/O7Ty f7aZD/2h1WBqbiy/PCaXcmQ5Z7w1XnTSYMiadxR3BxKaY7QuBfzaDZLfmhUVaGTG MRWLsU1pZbVMRV4EoirSPyUSpHHxc3RXGDQnDSj93blTORk6kX4xs5SLAoGBAMDZ 2OJwgtlW2QAs3xBwXhzsTagOUrInCKN8K4s3Orqayfe1IKXVIB04HBVCpc1Mchll iu7fwwxQ6UGbz7LPlPWnVWr7rer1KcvOc2Fu7/ooTGGwfH8kItLYldHRtGr/kUpX OyrwPHNTZHsQhEMnrX/kDs1Xc2vSFTlPCwn9VRHVAoGAaRkUutERJ5Q4zVU7MfV4 AA3NqzcOnG8YNlvxr9DQzd1feTflp4U9ZBT9qtDbrllmtNEBvq6jYxjTDClrFpnp jCu4GtQ4B9nWMck+t9jy3QjnDL+MGQnp/WnZhLUZA3oDGN1E+IVXVurlOJTDYo4/ 9J8FwvyZ+kb0QNgUxpJb4eMCgYBqV/a0L0zIYo64/QVogD41fsz3ziYl3UZzOGae ly8IdZDHypadO6BA3I8H3j+lrPECNi9duABLi1aE+lGXDcbbi5Gbs/tcpCKPI2IW qWElthEgkXylc5zMXeiH0jbGBfXtY5rZ+62p/qNbBWmZyohvDKho7T9VhnxzpLW2 pX7CnQKBgQDIHXF1Z2HDcPR8ltgFZ/zFoHP4M7T/++8oiappe60A1GM0vHNlGrNP 4tiCjCOphEFk09J7H4o2qjI3Cb4bnqh26vYztxAZJdFux6E+yHU3PDiVeQu81vhL BK1gXCh1Ypz+X+sH/oDyx0U7mKVqUxnT4BuHRlSG50TWQRB9dFFE9A== -----END RSA PRIVATE KEY----- ',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'Key Key',
		Type: 'RSA',
		Length: 512,
		PublicKey:
			'-----BEGIN PUBLIC KEY----- MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIskZcYLRdbEhdx43eFJpqWYWAy127oc WBNNHR+ALCOOvpp0XCUo2W/SkWb4PW56XNBC8cU7osiCWnMeZQVQ9NUCAwEAAQ== -----END PUBLIC KEY----- ',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIIBOgIBAAJBAIskZcYLRdbEhdx43eFJpqWYWAy127ocWBNNHR+ALCOOvpp0XCUo 2W/SkWb4PW56XNBC8cU7osiCWnMeZQVQ9NUCAwEAAQJAC9AfQ90ZJM6yfrFURRg3 qb9xWkLmULqvT5QwcMg09x+6q1levmzUCoS6ht39YytPbmLJo4I8vPsOx9xeIPWE 0QIhAOXOe0AXu3Vj8KVHi0uKb/LVLsHX819MeNrXJG+Ft3wnAiEAmwBsOPTJHQl0 XsxmTscdQCAnJGklpxYWk4kPN1Lk2KMCIBdaeGP3BXHUiiwBrUIr+1xuFaZVT8Ir f0yd+HHs4MyZAiBQzb6dTpcNaSFeTiZDiS+pf1mIdLwpR62LShdBmxgsCwIhAIBo HPQhVuKMLpoCyowjnfR34RCpA6/t1ZZrHZVQqTLX -----END RSA PRIVATE KEY----- ',
		UserID: 1,
	});
	db.keypair.create({
		Name: 'Test 1',
		Type: 'RSA',
		Length: 1024,
		PublicKey:
			'-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCczBoWKFArXhZK5tQUjZb2BWLD HncffSI0HkOdP1AnySrCH+r9Up6iAsXI6crrJUO5VqfnHv3LxXJPh33E6dAIlCIw 0G3xygGo9P/F0MaScdXImcSLcOR8CW6oEgXUJdDrv1p+jhxst6DF1Xd3sohbAVJB Bkq5SEEl6nzvMKBp1QIDAQAB -----END PUBLIC KEY----- ',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIICXAIBAAKBgQCczBoWKFArXhZK5tQUjZb2BWLDHncffSI0HkOdP1AnySrCH+r9 Up6iAsXI6crrJUO5VqfnHv3LxXJPh33E6dAIlCIw0G3xygGo9P/F0MaScdXImcSL cOR8CW6oEgXUJdDrv1p+jhxst6DF1Xd3sohbAVJBBkq5SEEl6nzvMKBp1QIDAQAB AoGAQk9+6Mf7v5t2yg58uoR2x2zXq7UCo+qDwI7cAXB5MZo93wMomiGKvPF3O9TD 4FZOId+n+nJ82uSRx1iBs/k95PTrT7MrnRQzHFe+YOba49NmzO6Z3bDGE0DgCUf9 cSekEWNnWnGsqqmkTLeVBXl4+CRNaETN2WqqE9p/jF/mcYECQQD8ImM+DSC0TSI/ wDeYjXEiPazt99z8APSc3fLJNG7oIEq+lxfLGkXJ0FHhvfpozm1n4pTcKzHeURXe WAhxsfDJAkEAnzOFnVuH+FTLLgl/UaTgmNWL5o4Xi0fDghyHi3sKrQjPVp6MjFYX NJzas0+z6IkIju3gFyZ0TtLtBGQW9zYirQJBAPUVGBLBAAFC2P/PADuxgT8fZHEM diofY6b3t4AND6FjgkQw6lfqedvqOy2LVVV7Eq3geYJqGldXykIOoGaj6MECQD9D /kk2YqZxK/0zkQElAIw78MjCluCmuC8wnzzyvJ9e7OaDQ19Rpw8ldlPjzJ8QNfJ2 3aLViUr5z277R5UeUlECQH9ygW5VrFOjeinB7eWxyhO0lBA53sQ4X4MZA/8s7qaa +WRj+S7rV0xuY+otCkm8CbQUD3Puy951ATRkYVFgGNI= -----END RSA PRIVATE KEY----- ',
		UserID: 2,
	});
	db.keypair.create({
		Name: 'Keypair',
		Type: 'RSA',
		Length: 1024,
		PublicKey:
			'-----BEGIN PUBLIC KEY----- MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC20w1rt8j5ghaxHV7Lh2A6gx6L qIS+7TK6b7qMnFAVmnwEaOtr4VKXFNqF5Gm4lgfRPncJFVnR7X8VqprF9gwtQYk8 DepXxehwZe+SluJS8ei+ZxDbDhWrXHwDvdvBLykoqNaa0n1/uP/YGxizmr+uDm05 P6wzaoRhC7g+FMjI/QIDAQAB -----END PUBLIC KEY----- ',
		PrivateKey:
			'-----BEGIN RSA PRIVATE KEY----- MIICXgIBAAKBgQC20w1rt8j5ghaxHV7Lh2A6gx6LqIS+7TK6b7qMnFAVmnwEaOtr 4VKXFNqF5Gm4lgfRPncJFVnR7X8VqprF9gwtQYk8DepXxehwZe+SluJS8ei+ZxDb DhWrXHwDvdvBLykoqNaa0n1/uP/YGxizmr+uDm05P6wzaoRhC7g+FMjI/QIDAQAB AoGBAJcPD3m/Yxl1uVYilF7KvmHaUPTICtbOmimdg6AGz8zp1iq2nj6G8HzQyDX1 Ir1XiaIEYMpqj8p615SJYFTNFgUwQFxyIlmJZdw/+WSyKRy5dhZkxgG02s6uTuiX RlpZHFUBUJz9OFayZyYdTgZlRNgKk05f2gWxOd4Mpinu1cdBAkEA6HllzV/6ANMg BVTHhDn2EQ6+iCNEdlveWsghQEt982yWuzybtsTOh4yH0jtCuXOkofjQfCWa024Q NFGqEk1puQJBAMlTZo4nlGmp4q3AX+QBrC+cE/WGLwj6WpCcWxwdFLnFfFpd4Pmt KD2EGoeSQ5CGUnCIcyZLB8SnaNYYSUVcK2UCQQC1JHLYtqJdJiVbQhY8x9UesXhx J9nex/LYlfyi1rALj19cAfvrTCsJn8ztWVPCoYN02iXJtpuPh8GEouV8YWmxAkBu UpaLZaMNd/vwrM+fOU9q04OYcsyJhe9k+VlwAXufBVpMhs9G4p1/gEmtavg9VW4N nqhDHrCGEhr/31Uffg+FAkEAuIfgU03W1cx0d+XfW5lxCCd4dOIrCsKvVx0JWt9x dONn+3MQFvwWO699HM+E3FDHLINY8HBwBrGOb20wblMMgg== -----END RSA PRIVATE KEY----- ',
		UserID: 2,
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
