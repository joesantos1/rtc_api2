const db = require('../database/db');

const RankingP = db.sequelize.define('likes',{
    idlikes: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    likes_category: {
        type: db.Sequelize.STRING
    },
    likes_category_id: {
        type: db.Sequelize.INTEGER
    },
    likes_iduser: {
        type: db.Sequelize.INTEGER
    },
    likes_value: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = RankingP;