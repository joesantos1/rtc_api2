const db = require('../database/db');

const _DB = db.sequelize.define('refs',{
    idrefs:{
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    refs_user: {
        type: db.Sequelize.STRING
    },
    refs_ref: {
        type: db.Sequelize.STRING
    }
});

module.exports = _DB;