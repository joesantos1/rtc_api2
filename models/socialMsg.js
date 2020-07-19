const db = require('../database/db');

const RankingP = db.sequelize.define('socials_msgs',{
    idsocials_msgs: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    socials_msgs_content: {
        type: db.Sequelize.STRING
    },
    socials_msgs_iduser: {
        type: db.Sequelize.INTEGER
    },
    socials_msgs_status: {
        type: db.Sequelize.STRING
    },
    socials_id: {
        type: db.Sequelize.INTEGER
    },
    socials_msgs_resp: {
        type: db.Sequelize.INTEGER
    },
    socials_msgs_likes: {
        type: db.Sequelize.INTEGER
    },
    socials_msgs_complaints: {
        type: db.Sequelize.INTEGER
    },
});

module.exports = RankingP;