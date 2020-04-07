const db = require('../models');
const Keypair = db.keypairs;
const Op = db.Sequelize.Op;

// get all keypairs of 1 user by id
exports.getKeys = (req, res) => {};

// get all keypairs for all users
exports.getAllKeys = (req, res) => {};

// create new key for user ID
exports.createKey = (req, res) => {};

// delete key by ID
exports.deleteKey = (req, res) => {};
