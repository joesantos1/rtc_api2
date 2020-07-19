const Sequelize = require("sequelize");

const sequelize = new Sequelize('bd_rtchamp', 'joe1', '123456',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

//0gG+=NFly.{O