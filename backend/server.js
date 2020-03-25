const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync tables in db with tables created in models
// remove 'force: true' to not drop existing tables on sync
db.sequelize.sync({ force: true }).then(() => {
    console.log('DB dropped and re-synced.');
  });

// simple root route
app.get("/", (req, res) => {
  res.json({ message: 'Welcome to the application.' });
});

// set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});