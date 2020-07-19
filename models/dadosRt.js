const db = require('../database/db');

const RankingP = db.sequelize.define('rts',{
    rts_question_id: {
        type: db.Sequelize.INTEGER
    },
    rts_question_resposta: {
        type: db.Sequelize.INTEGER
    },
    rts_timein: {
        type: db.Sequelize.STRING
    },
    rts_timeout: {
        type: db.Sequelize.STRING
    },
    rts_user_id: {
        type: db.Sequelize.INTEGER
    },
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    rts_rtp: {
        type:db.Sequelize.INTEGER
    },
    rts_tempo: {
        type: db.Sequelize.INTEGER
    },
    rts_book_id: {
        type: db.Sequelize.INTEGER
    },
    rts_resultado: {
        type: db.Sequelize.TINYINT
    },
    rts_user_token: {
        type: db.Sequelize.STRING
    },
    rts_book_titulo: {
        type: db.Sequelize.STRING
    },
    rts_question_pergunta: {
        type: db.Sequelize.STRING
    }
});

module.exports = RankingP;