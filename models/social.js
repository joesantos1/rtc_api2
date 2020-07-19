const db = require('../database/db');

const RankingP = db.sequelize.define('socials',{
    idsocials: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    socials_titulo: {
        type: db.Sequelize.STRING
    },
    socials_book_id: {
        type: db.Sequelize.INTEGER
    },
    socials_book_titulo: {
        type: db.Sequelize.STRING
    },
    socials_tipo: {
        type: db.Sequelize.INTEGER
    },
    socials_likes: {
        type: db.Sequelize.INTEGER
    },
    socials_complaints: {
        type: db.Sequelize.INTEGER
    },
    socials_creator: {
        type: db.Sequelize.INTEGER
    },
    socials_data: {
        type: db.Sequelize.STRING
    }
});

module.exports = RankingP;