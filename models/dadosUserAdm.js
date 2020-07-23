const db = require('../database/db');

const RankingP = db.sequelize.define('users_adms',{
    idusers_adm: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    users_adm_name: {
        type: db.Sequelize.STRING
    },
    users_adm_login: {
        type: db.Sequelize.STRING
    },
    users_adm_pass: {
        type: db.Sequelize.STRING
    },
    users_adm_nivel: {
        type: db.Sequelize.INTEGER
    },
    users_adm_email: {
        type: db.Sequelize.STRING
    },

});

module.exports = RankingP;