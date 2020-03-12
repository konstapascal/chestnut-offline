// creating model for user table
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING
         },
        lastname: {
            type: Sequelize.STRING
         },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    
return User;
};