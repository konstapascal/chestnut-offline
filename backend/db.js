require('dotenv').config({ path: './../.env' })
const Sequelize = require('sequelize')
const UserModel = require('./models/user')

const dbName = process.env.DB_NAME
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dialect = process.env.DIALECT

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dialect,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
})

const User = UserModel(sequelize, Sequelize)

sequelize
    .sync({ force: false })
    .then(() => {console.log('Table created successfully!')
})

module.exports = { User }