const express = require('express');
const dUser = require('../models/dadosUser');
const dBook = require('../models/dadosBook');
const qUest = require('../models/dadosQuestions');
const rTsch = require('../models/dadosRt');
const sOcia = require('../models/social');
const sOmsg = require('../models/socialMsg');
const lIkes = require('../models/likes');
const cOmpl = require('../models/complaints');
const moment = require('moment');
const { Op } = require("sequelize");
const { atualizaRanking, tRTandTopicsBooks, validaEMAIL, dateNow, dateNow2, generateToken, LikesCompls } = require('../src/utils');
const bcrypt = require('bcryptjs');
const authMiddlew = require('../src/middlewares/auth')

const validator = require('validator');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        //ATUALIZA TOTAL DE RT REALIZADO EM CADA BOOK
        const bk1 = await dBook.findAndCountAll();

        var regBook = []

        for (var i = 0; i <= bk1.count-1; i++) {

           var totalRt = await tRTandTopicsBooks('rts', bk1.count,bk1.rows[i].id)

           await dBook.update({ book_total_rt: totalRt }, { where: { id: bk1.rows[i].id }})
        }

        const bkAtualizado = await dBook.findAndCountAll({where: {'book_status': 1}},{
            order: [['book_total_rt', 'DESC']]
        });
        

        //DADOS PARA TELA INICIAL DE LIVROS MAIS LIDOS --------- 
        for(var i = 0; i <= bkAtualizado.count-1; i++){

            var idBook = bkAtualizado.rows[i].id

            regBook[i] = {
                    totalRt: bkAtualizado.rows[i].book_total_rt,
                    titulo: bkAtualizado.rows[i].book_titulo,
                    link: bkAtualizado.rows[i].book_link1,
                    capa: bkAtualizado.rows[i].book_capa_url,
                    autor: bkAtualizado.rows[i].book_autor,
                    idBook,
                    position: i + 1
                }
        }
        
        res.status(200).send({
            ranki: await atualizaRanking(),
            lista2: regBook
        })
            
    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'Erro ao carregar Infor. Inciais > ' + error})
    }
});

router.get('/bookinfor/:id', async (req, res) => {

    //DADOS PARA TELA INICIAL DE LIVROS MAIS LIDOS --------- 

   dBook.findOne({
        where: { 'id': req.params.id }
    }).then(async bki => {
        res.status(200).send({
            
            lista2: bki,
            TOPO: false
        })
    }).catch(function (erro) {
        console.log('Erro ao carregar o livro: ' + erro)
    });

});

router.get('/rtbook/:id',authMiddlew, async (req, res) => {

    try {

    const USERID = req.userId.id
    const authHeader = req.headers.authorization;

    //CARREGA RT DO LIVRO ----------------->

    const verificaRT = await rTsch.findAndCountAll({
        where: { 'rts_user_id': USERID, 'rts_book_id': req.params.id, 'rts_resultado': 1 }
    });

    //VERIFICA QUAIS QUESTÕES DENTRO DO RT JÁ FORAM REALIZADAS PELO USUÁRIO
    var excluiQuestao = []
    var excluiTotal = 0

    if(verificaRT){
        for(var i=0; i<=verificaRT.count-1;i++){
            excluiQuestao[i] = verificaRT.rows[i].dataValues.rts_question_id
        }
        
        excluiTotal = verificaRT.count
    }
    
    //BUSCA INFOR DO BOOK
    dBook.findOne({
        where: { 'id': req.params.id }
    }).then(async (bki) => {

        //VERIFICA ULTIMA QUESTÃO REALIZADA NO RT ATUAL E TRAZ UMA QUESTÃO DIFERENTE
        const vqr = await rTsch.findOne({where: {'rts_book_id': bki.id, 'rts_user_id': USERID}}, {order: [['id', 'DESC']]});

        if(vqr){
            excluiQuestao[excluiTotal-1] = vqr.rts_question_id
        }

        //BUSCA DADOS DA PROXIMA QUESTAO - QUESTOES APROVADAS TEM STATUS: 1
        qUest.findOne({
            where: { 
                'questions_book_id': bki.id, 
                'id':{[Op.not]: excluiQuestao}, 
                'questions_status': 1 
            }
        }).then(async qti => {

            //BUSCA NICK DO CRIADOR DA QUESTÃO
            const u = await dUser.findOne({where: {'id': qti.questions_creator}})
            
            rTsch.create({

                rts_question_id: qti.id,
                rts_question_pergunta: qti.questions_pergunta,
                rts_user_id: USERID,
                rts_timein: dateNow(),
                rts_book_id: bki.id,
                rts_book_titulo: bki.book_titulo,
                rts_resultado: 0,
                rts_user_token: authHeader

            }).then(() => {

                rTsch.findOne({
                    where: { 'rts_user_id': USERID, 'rts_resultado':0 },
                    order: [['id', 'DESC']]
                }).then(qst => {
                    res.status(200).send({
                        
                        qpergunta: qti.questions_pergunta,
                        qop1: qti.questions_op1,
                        qop2: qti.questions_op2,
                        qop3: qti.questions_op3,
                        qop4: qti.questions_op4,
                        qdetalhes: qti.questions_detalhes,
                        btitulo: bki.book_titulo,
                        rri: qst.id,
                        qqi: qti.id,
                        resps: false,
                        creator: u.users_nick
                    })
                }).catch(function (erro) { throw 'Erro ao CARREGAR RT: ' + erro })

            }).catch(function (erro) { throw 'Erro ao cadastrar RT: ' + erro; })

        }).catch(function (erro) {
            res.status(400).send({RTcompleto: true})
             throw 'Erro ao carregar a questão: ' + erro
            });

    }).catch(function (erro) { throw 'Erro ao carregar o livro: ' + erro; })

    } catch (error) {
        console.log(error);
        return res.status(400).send({err: 'Error'})
    }

    

});

router.get('/rank', async (req, res) => {
    const rank = await atualizaRanking();
    res.status(200).send({rank});
});

router.get('/authvuser', authMiddlew, (req, res) => {
    res.status(200).send({loggin: true})
    return
});

router.get('/rts/:nick', async (req, res) =>{

    try {
        const USER_NICK = req.params.nick

        const USERID = await dUser.findOne({ where: { 'users_nick': USER_NICK}});

        if(USERID){

            const RTSUSER = await rTsch.findAndCountAll({
                where: { 'rts_user_id': USERID.id, 'rts_resultado': 1}, 
                order: [['createdAt', 'DESC']]
            });
            const RTSUSERt = await rTsch.count({where: { 'rts_user_id': USERID.id }});

            if(RTSUSER){

                const RTDADOS = []

                for(var i=0; i<=RTSUSER.count -1; i++){

                    RTDADOS[i] = {
                        book_titulo: RTSUSER.rows[i].dataValues.rts_book_titulo,
                        book_id: RTSUSER.rows[i].dataValues.rts_book_id,
                        finalizado: RTSUSER.rows[i].dataValues.rts_timein,
                        pergunta: RTSUSER.rows[i].dataValues.rts_question_pergunta,
                        rtp: RTSUSER.rows[i].dataValues.rts_rtp,
                        tempo: RTSUSER.rows[i].dataValues.rts_tempo
                    }

                }

                //BUSCA POSIÇÃO NO RANKING ATUALIZADA
                const RANKATUALIZADO = await atualizaRanking()
                const posicaoNoRank = RANKATUALIZADO.find(t => t.nick === USER_NICK);

                res.status(200).send({
                    TOTALRTS: {
                        user_nome: USERID.users_nome,
                        user_total_rtp: USERID.users_rtp,
                        rts: RTDADOS,
                        rts_total: RTSUSERt,
                        rts_totalc: RTSUSER.count,
                        posRank: posicaoNoRank.pos,
                        premio: posicaoNoRank.premio,
                    }
                }) 

            }else{
                throw { error: 'RTs não encontrados.'}
            }

        }else{
            throw {error: 'Usuário não encontrado.'}
        }
    } catch (error) {
        res.status(400).send({error})
        console.log(error);
        
    }

})

router.get('/datauser', authMiddlew, (req, res) => {

    const USERID = req.userId.id

    dUser.findOne({ where: { 'id': USERID }}).then((u) => {
        return res.status(200).send({
            
                nome: u.users_nome,
                email: u.users_email,
                tel1: u.users_tel1,
                tel2: u.users_tel2,
                endereco: u.users_endereco,
                cidade: u.users_cidade,
                estado: u.users_estado,
                nasc: u.users_nasc,
                nick: u.users_nick
            
        })
    }).catch(error => {
        console.log(error);
        return res.status(403)
    })
})

router.get('/userpainel', authMiddlew, async (req, res) => {

    try {

        const USERID = await dUser.findOne({ where: { 'id': req.userId.id}});

        if(USERID){

            const RTSUSER = await rTsch.findAndCountAll({where: { 'rts_user_id': USERID.id }});

            if(RTSUSER){

                const RTDADOS = []

                for(var i=0; i<=RTSUSER.count -1; i++){

                    var tempo = RTSUSER.rows[i].dataValues.rts_tempo == null ? 0 : RTSUSER.rows[i].dataValues.rts_tempo;
                    var rtp = RTSUSER.rows[i].dataValues.rts_rtp == null ? 0 : RTSUSER.rows[i].dataValues.rts_rtp;

                    RTDADOS[i] = {
                        book_titulo: RTSUSER.rows[i].dataValues.rts_book_titulo,
                        book_id: RTSUSER.rows[i].dataValues.rts_book_id,
                        finalizado: RTSUSER.rows[i].dataValues.createdAt,
                        pergunta: RTSUSER.rows[i].dataValues.rts_question_pergunta,
                        rtp,
                        tempo
                    }

                }

                //BUSCA POSIÇÃO NO RANKING ATUALIZADA
                const RANKATUALIZADO = await atualizaRanking()
                const posicaoNoRank = RANKATUALIZADO.find(t => t.nick === USERID.users_nick);

                res.status(200).send({
                    TOTALRTS: {
                        user_nome: USERID.users_nome,
                        user_nick: USERID.users_nick,
                        user_total_rtp: USERID.users_rtp,
                        rts: RTDADOS,
                        rts_total: RTSUSER.count,
                        posRank: posicaoNoRank.pos,
                        premio: posicaoNoRank.premio,
                    }
                }) 

            }else{
                throw { error: 'RTs não encontrados.'}
            }

        }else{
            throw {error: 'Usuário não encontrado.'}
        }
    } catch (error) {
        res.status(400).send({error})
        console.log(error);
        
    }
})

router.get('/userpainelquestions', authMiddlew, async (req, res) => {

    try {

        const USERID = await dUser.findOne({ where: { 'id': req.userId.id}});

        if(USERID){

            const QUESUSER = await qUest.findAndCountAll({where: { 'questions_creator': USERID.id }});

            if(QUESUSER){

                const buscabook = async (id) => {
                    
                    var r = await dBook.findOne({where: {'id': id}})

                    return r.book_titulo
                }

                const dq = []

                for(var i=0;i<=QUESUSER.count-1;i++){

                    var qd = QUESUSER.rows[i].dataValues
                    dq[i] = {
                        questao: qd.questions_pergunta,
                        status: qd.questions_status,
                        criado: qd.createdAt,
                        book: await buscabook(qd.questions_book_id),
                        bookid: qd.questions_book_id,
                        likes: await LikesCompls('likes', 'rt_questions', qd.id, 0)
                    }

                }

                return res.status(200).send({dq})

            }else{
                throw { error: 'RTs não encontrados.'}
            }

        }else{
            throw {error: 'Usuário não encontrado.'}
        }
    } catch (error) {
        res.status(400).send({error})
        console.log(error);
        
    }
})

router.get('/comunity', async (req, res) => {
    try {

        //ATUALIZA TOTAL DE RT REALIZADO EM CADA BOOK
        const bk1 = await dBook.findAndCountAll();

        var regBook = []

        for (var i = 0; i <= bk1.count-1; i++) {

           var totalRt = await tRTandTopicsBooks('topics',bk1.count,bk1.rows[i].id)

           await dBook.update({ book_total_topic: totalRt }, { where: { id: bk1.rows[i].id }})
        }

        const bkAtualizado = await dBook.findAndCountAll({
            order: [['book_total_topic', 'DESC']]
        });
        

//DADOS PARA TELA INICIAL DE LIVROS MAIS LIDOS --------- 
        for(var i = 0; i <= bkAtualizado.count-1; i++){

            var idBook = bkAtualizado.rows[i].id

            regBook[i] = {
                    totalRt: bkAtualizado.rows[i].book_total_topic,
                    titulo: bkAtualizado.rows[i].book_titulo,
                    link: bkAtualizado.rows[i].book_link1,
                    capa: bkAtualizado.rows[i].book_capa,
                    autor: bkAtualizado.rows[i].book_autor,
                    idBook,
                    position: i + 1
                }
        }
        
        res.status(200).send({
            ranki: await atualizaRanking(),
            lista2: regBook
        })
            
    } catch (error) {
        console.log(error);
        res.status(400).send({message: 'Erro ao carregar Infor. Inciais > ' + error})
    }
})

router.get('/ubookcommunity/:id', authMiddlew, async (req, res) => {
    try {

        const USERID = req.userId.id

        const BOOKID = req.params.id

        const SOCIAL = await sOcia.findAndCountAll({where: { 'socials_book_id': BOOKID }})

        if(!SOCIAL){
            throw res.status(400)
        }else{
            const dt = []

            for(var i=0; i<=SOCIAL.count-1;i++ ){
                
                const USER_NICK = await dUser.findOne({where: {'id': SOCIAL.rows[i].dataValues.socials_creator}})
                
                const SOCIALMSG = await sOmsg.count({ where: { 'socials_id': SOCIAL.rows[i].dataValues.idsocials }});

                dt[i] = {
                    si: SOCIAL.rows[i].dataValues.idsocials,
                    stitulo: SOCIAL.rows[i].dataValues.socials_titulo,
                    stipo: SOCIAL.rows[i].dataValues.socials_tipo,
                    scriador: USER_NICK.users_nick,
                    screated: SOCIAL.rows[i].dataValues.socials_data,
                    stotal: SOCIALMSG,
                    likes: await LikesCompls('likes', 'communit_topics', SOCIAL.rows[i].dataValues.idsocials,0),
                    likes_user: await LikesCompls('likes', 'communit_topics',SOCIAL.rows[i].dataValues.idsocials, USERID)
                }
            }

            const b = await dBook.findOne({where: {'id': BOOKID}})

            res.status(200).send({
                dt,
                sbook: b.book_titulo
            })

            return
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

router.get('/bookcommunity/:id', async (req, res) => {
    try {

        const BOOKID = req.params.id

        const SOCIAL = await sOcia.findAndCountAll({where: { 'socials_book_id': BOOKID }})

        if(!SOCIAL){
            throw res.status(400)
        }else{
            const dt = []

            for(var i=0; i<=SOCIAL.count-1;i++ ){
                
                const USER_NICK = await dUser.findOne({where: {'id': SOCIAL.rows[i].dataValues.socials_creator}})
                
                const SOCIALMSG = await sOmsg.count({ where: { 'socials_id': SOCIAL.rows[i].dataValues.idsocials }});

                dt[i] = {
                    si: SOCIAL.rows[i].dataValues.idsocials,
                    stitulo: SOCIAL.rows[i].dataValues.socials_titulo,
                    stipo: SOCIAL.rows[i].dataValues.socials_tipo,
                    scriador: USER_NICK.users_nick,
                    screated: SOCIAL.rows[i].dataValues.socials_data,
                    stotal: SOCIALMSG,
                    likes: await LikesCompls('likes', 'communit_topics', SOCIAL.rows[i].dataValues.idsocials,0),
                    likes_user: false
                }
            }

            const b = dBook.findOne({where: {'id': BOOKID}})

            res.status(200).send({
                dt,
                sbook: b.book_titulo
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400)
    }
})

router.get('/bookcommunitytopic/:id', authMiddlew, async (req, res) => {

    try {

        const USERID = req.userId.id
        const TOPIC = req.params.id
        var AUTOR, md

        sOcia.findOne({where: {'idsocials': TOPIC }}).then(t => {

            sOmsg.findAndCountAll({where: {'socials_id': TOPIC, 'socials_msgs_status': 1}}).then(async m => {

                const tm = []

                for(var i = 0; i <= m.count-1; i++){

                    md = m.rows[i].dataValues

                    AUTOR = await dUser.findOne({where: { 'id': md.socials_msgs_iduser }})

                    tm[i] = {
                        
                        catid: md.idsocials_msgs,
                        msg: md.socials_msgs_content,
                        autor: AUTOR.users_nick,
                        dataMsg: md.createdAt,
                        denuncias: await LikesCompls('complaints', 'communit_msgs', md.idsocials_msgs, 0),
                        denuncias_user: await LikesCompls('complaints', 'communit_msgs', md.idsocials_msgs, USERID),
                        likes: await LikesCompls('likes', 'communit_msgs', md.idsocials_msgs,0),
                        likes_user: await LikesCompls('likes', 'communit_msgs',md.idsocials_msgs, USERID)
                    }
                }

                res.status(200).send({ tm, topic: t.socials_titulo, idbook: t.socials_book_id })
                return

            }).catch(error => { throw error })

        }).catch(error => {
            throw error
        })

    } catch (error) {
        
        console.log(error);
        return res.status(400);
    }

    
})

router.get('/listabooksnewrt', authMiddlew, (req, res) => {
    dBook.findAndCountAll({where: {'book_status': 1}, order: [['book_titulo', 'ASC']]}).then((r) => {

        const b = []

        for(var i=0;i<=r.count-1;i++){
            b[i] = {
                book_titulo: r.rows[i].dataValues.book_titulo,
                ib: r.rows[i].dataValues.id
            }
        }

       return res.status(200).send({b})
    }).catch(error => {
        console.log(error);
        return res.status(400);
    })
})

//POST-------------------------FORMS

router.post('/cadastrouser', validaEMAIL, async (req, res) => {

    try {

        const { nome, nick, email, pass, pass_confirm } = req.body;

    //VERIFICA CAMPOS VAZIOS
    var error = { error: {  
            msg: 'Por favor, digite seu nome completo.',
            msg: 'Por favor, digite uma senha.' 
            }
        }

    if (validator.isEmpty(nome) || validator.isEmpty(pass)) {
        //VERIFICA CAMPOS VAZIOS - EM BRANCO
        res.status(401).send({error})

    } else if (!validator.isLength(pass, { min: 5 }) || !validator.isLength(nome, { min: 5 })) {
        //VERIFICA TAMANHO DE CARACTERES
        
        res.status(401).send({error: { msg: 'Dados incorretos. Número mínimo de caracteres inválido.' }})

    } else if (!validator.equals(pass,pass_confirm)) {
        //VERIFICA SE SENHAS CONFEREM
        res.status(401).send({error: {msg: 'Senhas não conferem.'}})

    } else {
        //const senhaHASH = await bcrypt.hash(pass, 10);

        dUser.create({
            users_nome: nome,
            users_email: email,
            users_pass: pass,
            users_nick: nick
        }).then(() => {
            dUser.findOne({
                where: { 'users_nick': nick, 'users_email': email }
            }).then(nxt => {

                //USUÁRIO LOGADO -> RETORNA DADOS DO USUÁRIO

                res.status(200).send({
                    user: {
                        nome: nome, 
                        nick: nick,
                        email: email
                    },
                    
                    token: generateToken({id: nxt.id}),
                    
                })

            
            }).catch(function (erro) {
                console.log('Erro ao buscar USUÁRIO: ' + erro)
            })
        }).catch(function (erro) {
            console.log('Erro ao CADASTRAR usuário: ' + erro)
        })
    }
        
    } catch (error) {
        console.log('ERRO AO CADASTRAR USUÁRIO: ' + error);
        res.status(400).send({error})
    }

    

});

router.post('/userauth', async (req, res) => {
    
    
    const { nick, pass } = req.body
    

    var nickVazio = validator.isEmpty(nick);
    var passVazio = validator.isEmpty(pass);

    if (nickVazio || passVazio) {

        const error = {
                msg: 'Por favor, digite um Nickname (ID)',
                msg: 'Por favor, digite uma senha'
        }

       return res.status(401).send({error});

    } else {

        const user = await dUser.findOne({where: {'users_nick': nick}})

        if(!user){
            return res.status(401).send({error: 'Usuário não encontrado.'});
        }
              
       const vSenha = bcrypt.compareSync(pass, user.users_pass)

                    if(!vSenha){
                
                        res.status(401).send({error: 'Senha incorreta.'});

                        return

                    }else{

                        res.status(200).send({
                            user: {
                                nome: user.users_nome,
                                nick: nick,
                                email: user.users_email
                            },
                            token: generateToken({id: user.id})
                        })

                    }

        
        
    }

});

router.post('/addrt',authMiddlew, async (req, res) => {

    const {rti, qti, resposta, token, nick } = req.body;

    var pr = 0;
    var po = 0;

    const USERID = req.userId.id

    //ATUALIZA A QUESTÃO ABERTA
    var horagora = moment().format('DD/MM/YYYY, h:mm:ss a');

   rTsch.update({

        rts_question_resposta: resposta,
        rts_timeout: horagora

    }, {
        where: { id: rti }
    }).then(() => {
        //FAZ A VERIFICAÇÃO DA RESPOSTA E REGISTRA NO BD
       qUest.findOne({
            where: { 'id': qti }
        }).then(async verResp => {

            if (resposta == verResp.questions_resposta) {

               rTsch.findOne({
                    where: { 'id': rti }
                }).then(regRtp => {

                    //VERIFICA TEMPO DE RESPOSTA E REGISTRA QTD DE RTP GANHO NO BD
                    var calcRtp = (regRtp.updatedAt - regRtp.createdAt) / 1000

                    if (calcRtp > 90 && calcRtp < 0) {
                        res.status(400).send({error: 'RT inválido. Atualize a página e faça novamente.'})
                    } else {
                        var registraRtp = 90 - calcRtp;
                       rTsch.update({
                            rts_rtp: registraRtp,
                            rts_tempo: calcRtp,
                            rts_resultado: 1,
                            rts_user_token: token
                        }, {
                            where: { id: rti }
                        }).then(() => {
                            //FAZ O CALCULO DO TOTAL DE RTP GANHO NO MÊS
                           
                           rTsch.findAndCountAll({
                                where: { 'rts_user_id': USERID },
                                order: [['id', 'DESC']]
                            }).then(FINALRTPROCESS => {

                                var totalRTP = 0

                                for (var i = 0; i <= FINALRTPROCESS.count-1; i++) {

                                    totalRTP += parseInt(FINALRTPROCESS.rows[i].dataValues.rts_rtp++)
                                }

                               dUser.update({
                                    users_rtp: totalRTP
                                }, { where: { id: USERID } }).then(async () => {
                                    //SUCESSO :::::::
                                    
                                    //BUSCA POSIÇÃO NO RANKING ATUALIZADA
                                   const RANKATUALIZADO = await atualizaRanking()
                                   const posicaoNoRank = RANKATUALIZADO.find(t => t.nick == nick);

                                   if(posicaoNoRank){
                                        po = posicaoNoRank.pos
                                        pr = posicaoNoRank.premio
                                    }
                                   
                                   //API SEND
                                    res.status(200).send({
                                        tempo: FINALRTPROCESS.rows[0].dataValues.rts_tempo,
                                        rtp: FINALRTPROCESS.rows[0].dataValues.rts_rtp,
                                        respC: true,
                                        posR: po,
                                        premio: pr,
                                        token: token
                                    });
                                
                                })

                            })
                        })
                    }

                })

            } else {

                const RANKATUALIZADO = await atualizaRanking()
                const posicaoNoRank = RANKATUALIZADO.find(t => t.nick === nick);

                if(posicaoNoRank){
                    po = posicaoNoRank.pos
                    pr = posicaoNoRank.premio
                }

                res.status(200).send({

                    respC: false,
                    posR: po,
                    premio: pr,
                    token: token
                })
            }
        }).catch(function (erro) {
            console.log('Erro ao verificar resposta da questão: ' + erro)
        })
    }).catch(function (erro) {
        console.log('Erro ao cadastrar: ' + erro)
    });

});

router.post('/createtopics', authMiddlew, async (req, res) => {

    try {
        const USERID = req.userId.id

        const { titulo, msgs, idbook, tipo } = req.body

        if(validator.isEmpty(titulo) || validator.isEmpty(msgs)){
            return res.status(400)
        }

        const b = dBook.findOne({where: {'id': idbook}})

        sOcia.create({
            socials_tipo: tipo,
            socials_titulo: titulo,
            socials_book_id: idbook,
            socials_creator: USERID,
            socials_data: dateNow2(),
            socials_book_titulo: b.book_titulo
        }).then( async () => {

            const r = await sOcia.findOne({where: {socials_creator: USERID, socials_book_id: idbook}, order: [['idsocials', 'DESC']]})

            sOmsg.create({
                socials_msgs_content: msgs,
                socials_id: r.idsocials,
                socials_msgs_iduser: USERID,
                socials_msgs_status: 1
            }).then(() => {
                res.status(200).send({idcommu: r.idsocials,sucess: true})
            })
        })

    } catch (error) {
        console.log(error);
        return res.status(400);
    }
})

router.post('/createtopicmsg', authMiddlew, async (req, res) => {

    try {

        const USERID = req.userId.id

        const { newmsg, topic, resp } = req.body

        if(validator.isEmpty(newmsg)){
            throw 'Mensagem não informada.'
        }else{

            sOmsg.create({
                socials_msgs_content: newmsg,
                socials_id: topic,
                socials_msgs_iduser: USERID,
                socials_msgs_resp: resp,
                socials_msgs_status: 1
            })

            return res.status(200).send({sucess:true})
        }

    } catch (error) {
        res.status(400)
        console.log(error);
        return
    }
})

router.post('/rl', authMiddlew, async (req, res) => {
    try {

        USERID = req.userId.id

        const { category, catid } = req.body

        const LIKESID = await lIkes.findOne({where: {
            likes_category: category,
            likes_category_id: catid,
            likes_iduser: USERID
        }});

            if(LIKESID){
                lIkes.destroy({where: {
                likes_category: category,
                likes_category_id: catid,
                likes_iduser: USERID
                }}).then(() =>{
                    res.status(200).send({r: 0})
                })
                
            }else{
                lIkes.create({
                likes_category: category,
                likes_category_id: catid,
                likes_iduser: USERID
                }).then(() => {
                    res.status(200).send({r: 1})
                })
            }
        
    } catch (error) {
        res.status(400)
        console.log(error);
        return
    }
})

router.post('/rc', authMiddlew, async (req, res) => {
    try {

        USERID = req.userId.id

        const { category, catid } = req.body

        const LIKESID = await cOmpl.findOne({where: {
            complaints_category: category,
            complaints_category_id: catid,
            complaints_iduser: USERID
        }});

            if(LIKESID){
                cOmpl.destroy({where: {
                complaints_category: category,
                complaints_category_id: catid,
                complaints_iduser: USERID
                }}).then(() =>{
                    res.status(200).send({r: 0})
                })
                
            }else{
                cOmpl.create({
                complaints_category: category,
                complaints_category_id: catid,
                complaints_iduser: USERID
                }).then(() => {
                    res.status(200).send({r: 1})
                })
            }
        
    } catch (error) {
        res.status(400)
        console.log(error);
        return
    }
})

router.post('/newrt', authMiddlew, async (req, res) => {
    try {

       const { pergunta, detalhes, op1, op2, op3, op4, resposta, book } = req.body

       const vazio = [
           validator.isEmpty(pergunta),
           validator.isEmpty(detalhes),
           validator.isEmpty(op1),
           validator.isEmpty(op2),
           validator.isEmpty(op3),
           validator.isEmpty(op4),
           validator.isEmpty(resposta),
       ]

       const vz = vazio.find(v => v == true)

       if(vz && !book){
           return res.status(400).send({error: 'Por favor, preencha todos os campos obrigatórios.'})
       }

       qUest.create({
            questions_book_id: book,
            questions_pergunta: pergunta,
            questions_op1: op1,
            questions_op2: op2,
            questions_op3: op3,
            questions_op4: op4,
            questions_resposta: resposta,
            questions_detalhes: detalhes,
            questions_creator: req.userId.id,
            questions_status: 2
       }).then(() => {
           return res.status(200).send({sucess: true})
       })
        
    } catch (error) {
        res.status(400);
        console.log(error);
        return 
    }
})

//PUT ----------------------FORMS

router.put('/updateuserpass', authMiddlew, async (req, res) => {
    try {
        const { pass, newpass } = req.body
        const USERID = req.userId.id

        const USERDATA = await dUser.findOne({where: {'id': USERID}});

        if(USERDATA){

            const vSenha = bcrypt.compareSync(pass, USERDATA.users_pass)

            if(!vSenha){
                throw {msg: 'Senha atual incorreta.'}
                
            }
            else if(!validator.isLength(newpass,{min:5})){
                throw {msg: 'Tamanho inválido. Senha deve ter no mínimo 5 caracteres.'}
            }else{

                const salt = await bcrypt.genSalt(10)
         
                const hash = await bcrypt.hash(newpass, salt)
                
                dUser.update({
                    users_pass: hash
                },{
                    where: { id: USERID }
                }).then(() => {
                    res.status(200).send({sucess: true})
                }).catch(error => {
                    throw error
                })
            }

        }
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.put('/updateuser', authMiddlew, async (req, res) => {

    const { cidade, estado, tel1, tel2, endereco } = req.body

    const USERID = req.userId.id

    dUser.update({
        users_cidade: cidade,
        users_endereco: endereco,
        users_tel1: tel1,
        users_tel2: tel2,
        users_estado: estado
    }, {where: {
        id: USERID
    }}).then(() => {
        return res.status(200).send({sucess: true})
    }).catch(error => {
        console.log(error);
        return res.status(400);
    })
})

module.exports = router