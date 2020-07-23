const db = require('../database/db');

const modelBooks = db.sequelize.define('books',{
    book_titulo: {
        type: db.Sequelize.STRING
    },
    book_descricao: {
        type: db.Sequelize.STRING
    },
    book_capa: {
        type: db.Sequelize.STRING
    },
    book_capa_key: {
        type: db.Sequelize.STRING
    },
    book_capa_url: {
        type: db.Sequelize.STRING
    },
    book_link1: {
        type: db.Sequelize.STRING
    },
    book_autor: {
        type: db.Sequelize.STRING
    },
    book_total_rt: {
        type: db.Sequelize.INTEGER,
    },
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    book_total_topic: {
        type: db.Sequelize.INTEGER,
    },
    book_status: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = modelBooks;