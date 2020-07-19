const db = require('../database/db');

const RankingP = db.sequelize.define('users',{
    users_rtp: {
        type: db.Sequelize.INTEGER
    },
    users_nick: {
        type: db.Sequelize.STRING
    }
});

module.exports = RankingP;