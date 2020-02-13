require('dotenv').config({ path: './../.env' })
const express = require('express')
const bodyParser = require('body-parser')
const { User } = require('./db')

const app = express();

// Parse incoming requests data
app.use(bodyParser.json())

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({message: 'Welcome'}))

const port = process.env.PORT

app.listen(port, () => console.log(`App is running at port ${port}..`))

module.exports = app