module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        userid: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
        email: type.STRING
    })
}