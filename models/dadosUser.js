const db = require('../database/db');
const bcryptjs = require('bcryptjs')

const userModel = db.sequelize.define('users',{
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true
    },
    users_email: { type: db.Sequelize.STRING },
    users_nome: { type: db.Sequelize.STRING },
    users_nick: { type: db.Sequelize.STRING },
    users_pass: { type: db.Sequelize.STRING, },
    users_rtp: { type: db.Sequelize.INTEGER },
    users_rtp_total: { type: db.Sequelize.INTEGER },
    users_status: { type: db.Sequelize.INTEGER },
    users_tel1: { type: db.Sequelize.STRING },
    users_tel2: { type: db.Sequelize.STRING },
    users_cidade: { type: db.Sequelize.STRING },
    users_estado: { type: db.Sequelize.STRING },
    users_endereco: { type: db.Sequelize.STRING },
    users_foto_key: { type: db.Sequelize.STRING },
    users_foto_url: { type: db.Sequelize.STRING },
    users_verifica: { type: db.Sequelize.STRING },
    users_refs_id: { type: db.Sequelize.STRING },
    users_refs: { type: db.Sequelize.STRING },
    users_termos: { type: db.Sequelize.INTEGER },
    users_premios: { type: db.Sequelize.DOUBLE }
    
},{
  hooks: {
         beforeCreate: (user, option) => { 
   
            const salt = bcryptjs.genSaltSync(10)
         
            const hash = bcryptjs.hashSync(user.users_pass, salt)
            
            user.users_pass = hash
             
         }
    }  
});

module.exports = userModel;



