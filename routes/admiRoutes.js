const express = require('express');

const dUser = require('../models/dadosUser');
const dBook = require('../models/dadosBook');
const qUest = require('../models/dadosQuestions');
const rTsch = require('../models/dadosRt');
const sOcia = require('../models/social');
const sOmsg = require('../models/socialMsg');
const lIkes = require('../models/likes');
const cOmpl = require('../models/complaints');
const uSadm = require('../models/dadosUserAdm');

const moment = require('moment');
const { Op } = require("sequelize");
const { atualizaRanking, tRTandTopicsBooks, validaEMAIL, dateNow, dateNow2, generateTokenAdm, LikesCompls } = require('../src/utils');
const bcrypt = require('bcryptjs');
const authMiddlewAdm = require('../src/middlewares/auth_adm');
const multer = require('multer');
const multerConfig = require('../src/middlewares/multer.js');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const validator = require('validator');

const router = express.Router();

//TEST DE UPLOAD

router.get('/app/adm/lrtq',authMiddlewAdm, async (req, res) => {

    try {

        qUest.findAndCountAll({order: [['id', 'DESC']]}).then(async rq => {

            const t = []

            for(var i=0;i<=rq.count-1;i++){
                
                var lq = rq.rows[i].dataValues

                var b = await dBook.findOne({where: {'id': lq.questions_book_id}})

                var c = await dUser.findOne({where: {'id': lq.questions_creator}})

                t[i] = {
                    id: lq.id,
                    pergunta: lq.questions_pergunta,
                    book: b.book_titulo,
                    bookid: b.id,
                    criador: c.users_nick,
                    criadorid: c.id,
                    status: lq.questions_status,
                    likes: await LikesCompls('likes', 'questions', lq.id, 0),
                    register: lq.createdAt,
                    update: lq.updatedAt
                }
            }

            return res.status(200).send({t})
        })

    } catch (error) {
        console.log(error);
        return res.status(400)
    }

    

});

router.get('/app/adm/books',authMiddlewAdm, async (req, res) => {

    try {

        dBook.findAndCountAll({order: [['id', 'DESC']]}).then(async rb => {

            const b = []

            for(var i=0;i <= rb.count-1;i++){
                
                var lb = rb.rows[i].dataValues

                var q = await qUest.count({where: {'questions_book_id': lb.id}})

                b[i] = {
                    bookid: lb.id,
                    titulo: lb.book_titulo,
                    capa: lb.book_capa_url,
                    autor: lb.book_autor,
                    rts: lb.book_total_rt,
                    questions: q,
                    topics: lb.book_total_topic,
                    status: lb.book_status,
                    likes: await LikesCompls('likes', 'books', lb.id, 0),
                    reg: lb.createdAt,
                    upd: lb.updatedAt
                }
            }

            return res.status(200).send({b})
        })

    } catch (error) {
        console.log(error);
        return res.status(400)
    }
    

});

router.get('/app/adm/booksdata/:id', authMiddlewAdm, async (req, res) => {

    try {
        
        if(req.params.id){

            dBook.findOne({where: {'id': req.params.id}}).then(r => {
                return res.status(200).send({r})
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

router.get('/app/adm/authvuser', authMiddlewAdm, (req, res) => {
    return res.status(200).send({loggin: true});
})

router.get('/app/adm/rtq/:id', authMiddlewAdm, (req, res) => {
    try {

        qUest.findOne({where: {'id': req.params.id}}).then(async r => {

            const b = await dBook.findOne({where: {'id': r.questions_book_id}})
            const c = await dUser.findOne({where: {'id': r.questions_creator}})

            return res.status(200).send({
                book: b.book_titulo,
                resposta: r.questions_resposta,
                detalhes: r.questions_detalhes,
                op1: r.questions_op1,
                op2: r.questions_op2,
                op3: r.questions_op3,
                op4: r.questions_op4,
                pergunta: r.questions_pergunta,
                creator: c.users_nick,
                data: r.createdAt,
                status: r.questions_status
            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({error})
    }
})

router.get('/app/adm/lusers', authMiddlewAdm, (req, res) => {
    try {

        dUser.findAndCountAll({order: [['id', 'DESC']]}).then(async rsul => {

            const u = []
            const t = rsul.count

            for(var i=0;i<=rsul.count-1;i++){

                var r = rsul.rows[i].dataValues

                var rts = await rTsch.count({where: {'rts_user_id': r.id}});

                u[i] = {
                    rts,
                    r
                }

            }

            return res.status(200).send({u, t})
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({error})
    }
})

router.get('/app/adm/userdata/:id', authMiddlewAdm, (req, res) => {
    try {

        const uid = req.params.id

        dUser.findOne({where: {'id': uid}}).then(async r => {

            r.users_pass = null

            //TRAZ TODOS OS DADOS DE RT REALIZADO PELO USUÁRIO
            const urt = await rTsch.findAndCountAll({where: {'rts_user_id': uid}})

            const urts = []
            const uque = []

            for(var v in urt.rows){
                urts[v] = urt.rows[v]
            }

            const uqu = await qUest.findAndCountAll({where: {'questions_creator': uid}})

            for(var v in uqu.rows){
                uque[v] = uqu.rows[v]
            }

            return res.status(200).send({
                    r,
                    urts,
                    uque,
                    totalQuestion: uqu.count,
                    totalRT: urt.count
            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({error})
    }
})

// -------------- POST ------
router.post('/app/adm/userauth', async (req, res) => {

    try {

        const { login, pass } = req.body

        if(validator.isEmpty(login) || validator.isEmpty(pass)){
            throw { msg: 'Digite um login e senha.'}
        }
        
        const vl = await uSadm.findOne({where: {'users_adm_login': login }})

        if(vl){

            const vpass = bcrypt.compareSync(pass, vl.users_adm_pass)

            if(!vpass){

                throw { msg: 'Senha incorreta.'}

            }else{

                return res.status(200).send({

                    unome: vl.users_adm_name, 
                    token: generateTokenAdm({id: vl.idusers_adm})

                })
            }

        }else{

            throw {msg: 'Usuário não encontrado.'}

        }

    } catch (error) {
        console.log(error);
        return res.status(400)
    }

})

router.post('/upcapa/:id',authMiddlewAdm, multer(multerConfig).single('file'), async (req, res) => {

    try {
        const { originalname: name, key } = req.file

        const urlcapa = process.env.APP_URL + '/files/' + key

        dBook.findOne({where: {'id': req.params.id}}).then(async (r) => {

            if(r.book_capa_key){
                fs.unlink(path.resolve(__dirname, '..','tmp','uploads', r.book_capa_key), (error) => {
                    if(error) console.log(error);
                })
            }
            
            const updCapa = await dBook.update({
            book_capa: name,
            book_capa_key: key,
            book_capa_url: urlcapa
            }, {where: {'id': req.params.id}})

            return res.status(200).send({ urlcapa })
        })

    } catch (error) {
        console.log(error);
        return res.status(400);
    }

    
})

router.post('/upnewcapa/:id',authMiddlewAdm, multer(multerConfig).single('file'), async (req, res) => {

    try {
        const { originalname: name, key } = req.file

        const urlcapa = process.env.APP_URL + '/files/' + key

        if(req.params.id!='new'){
            fs.unlink(path.resolve(__dirname, '..','tmp','uploads', req.params.id), (error) => {
                if(error) console.log(error);
            })
        }
            
        return res.status(200).send({ urlcapa,key })


    } catch (error) {
        console.log(error);
        return res.status(400);
    }

    
})

router.post('/app/adm/bookscre', authMiddlewAdm, (req, res) => {
    try {
        
        const { titulo, autor, descricao, status, link, ckey, curl } = req.body

        for(var v in req.body){
            if(req.body[v] == null){
                return res.status(400).send({msg: 'Por favor, preencha todos os campos.'})
            }
        }

        dBook.create({
            book_titulo: titulo,
            book_autor: autor,
            book_capa_key: ckey,
            book_capa_url: curl,
            book_status: status,
            book_descricao: descricao,
            book_link1: link
        }).then(() => {
            return res.status(200).send({sucess:true})
        })

    } catch (error) {
        console.log(error);
        return res.status(400)
    }
});

//--------------- PUT -------
router.put('/app/adm/rtq', authMiddlewAdm, (req, res) => {
    
    try {
        const {status, idq} = req.body

        qUest.update({ questions_status: status }, {where: {'id': idq}}).then(() => {
            return res.status(200).send({s: status})
        })

    } catch (error) {
        console.log(error);
        return res.status(400)
    }

})

router.put('/app/adm/booksupd', authMiddlewAdm, (req, res) => {
    try {
        
        const {idbook, titulo, capa, autor, descricao, status, link } = req.body

        dBook.update({
            book_titulo: titulo,
            book_autor: autor,
            book_capa: capa,
            book_status: status,
            book_descricao: descricao,
            book_link: link
        }, {where: {'id': idbook}}).then(() => {
            return res.status(200).send({sucess: true})
        })

    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

router.put('/changestatus', authMiddlewAdm, async (req, res) => {
    try {
        
        const {id, status, tb } = req.body

        if(tb=='books'){
            await dBook.update({ 'book_status': status }, { where: {'id': id}})
        }
        else if(tb=='users'){
            await dUser.update({ 'users_status': status },{where: {'id': id}})
        }

        return res.status(200).send({sucess:true})

    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

router.put('/app/adm/updrtq', authMiddlewAdm, (req, res) => {
    try {

        const { pergunta, resposta, detalhes, op1, op2, op3, op4, status, id } = req.body

        for(var v in req.body){
            if(req.body[v] == null){
                throw 'ERROR: Preencha todos os campos.'
            }
        }

        qUest.update({
            questions_detalhes: detalhes,
            questions_op1: op1,
            questions_op2: op2,
            questions_op3: op3,
            questions_op4: op4,
            questions_pergunta: pergunta,
            questions_resposta: resposta,
            questions_status: status
        },
        { where: {'id': id }}).then(() => {
            return res.status(200).send({sucess:true})
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({error})
    }
})

module.exports = router