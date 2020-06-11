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

// Sync tables in db with tables created in models
db.sequelize.sync();

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
