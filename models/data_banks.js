const db = require('../database/db');

const MODEL = db.sequelize.define('data_banks',{
    iddata_banks: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bank_account_number: { type: db.Sequelize.INTEGER },
    bank_agency: { type: db.Sequelize.STRING },
    bank_code: { type: db.Sequelize.INTEGER },
    bank_user_id: { type: db.Sequelize.INTEGER },
    bank_titular: { type: db.Sequelize.STRING },
    bank_name: { type: db.Sequelize.STRING },
    bank_bitcoin_wallet: { type: db.Sequelize.STRING },
    bank_cpf: { type: db.Sequelize.STRING },
    data_bank_type: { type: db.Sequelize.STRING }
});

module.exports = MODEL;