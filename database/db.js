const Sequelize = require("sequelize");

const sequelize = new Sequelize('bd_rtchamp', 'blackaguia1', 'apq0x12Z',{
    host: 'mysql669.umbler.com',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

//0gG+=NFly.{O