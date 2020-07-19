const db = require('../database/db');

const RankingP = db.sequelize.define('complaints',{
    idcomplaints: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    complaints_category: {
        type: db.Sequelize.STRING
    },
    complaints_category_id: {
        type: db.Sequelize.INTEGER
    },
    complaints_iduser: {
        type: db.Sequelize.INTEGER
    },
    complaints_value: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = RankingP;