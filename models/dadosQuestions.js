const db = require('../database/db');

const QuestionD = db.sequelize.define('questions',{
    questions_book_id: {
        type: db.Sequelize.INTEGER
    },
    questions_pergunta: {
        type: db.Sequelize.STRING
    },
    questions_op1: {
        type: db.Sequelize.STRING
    },
    questions_op2: {
        type: db.Sequelize.STRING
    },
    questions_op3: {
        type: db.Sequelize.STRING
    },
    questions_op4: {
        type: db.Sequelize.STRING
    },
    questions_resposta: {
        type: db.Sequelize.INTEGER
    },
    questions_detalhes: {
        type: db.Sequelize.STRING
    },
    questions_creator: {
        type: db.Sequelize.INTEGER
    },
    questions_status: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = QuestionD;