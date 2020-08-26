const db = require('../database/db');

const MODEL = db.sequelize.define('requests',{
    idrequests: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    requests_userid: { type: db.Sequelize.INTEGER },
    requests_data_bankid: { type: db.Sequelize.INTEGER },
    requests_data_bankname: { type: db.Sequelize.STRING },
    requests_status: { type: db.Sequelize.INTEGER },
    requests_premio: { type: db.Sequelize.DOUBLE }
});

module.exports = MODEL;