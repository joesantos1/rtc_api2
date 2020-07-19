const db = require('../database/db');

const ChampA = db.sequelize.define('champs',{
    champs_premio: {
        type: db.Sequelize.INTEGER
    },
    champs_rk_id: {
        type: db.Sequelize.INTEGER
    },
    champs_date: {
        type: db.Sequelize.DATE
    },
});

module.exports = ChampA;