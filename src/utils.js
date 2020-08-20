const express = require('express');
const moment = require('moment');
const PRCR = require('../modules/rankingCalc2');
const dUser = require('../models/dadosRanking');
const rTsch = require('../models/dadosRt');
const lIkes = require('../models/likes');
const cOmpl = require('../models/complaints');
const sOcia = require('../models/social');
const validator = require('validator');
const { Op } = require("sequelize");
const JWT = require('jsonwebtoken');
const AUTH = require('../src/config/auth.json')

require('format-helper');

const RANK = [];
const Rpremio = 500;

const calcPosRank = (premioValue, fa) => {
    var resu = premioValue * PRCR[fa].fator
    return resu.format('N');
}

module.exports = {

    dateNow: () => {
        return moment().format('DD/MM/YYYY, h:mm:ss a');
    },
    dateNow2: () => {
        return moment().format('L') + ' às ' + moment().format('LT');
    },
    //DADOS PARA RANKING -----------------
    atualizaRanking: async () => {
        try {
            const result = await dUser.findAll({
                where: {'users_rtp': {[Op.gt]: 0}},
                order: [['users_rtp', 'DESC']],
                limit: 100
            })

            var foto = ''

            for (var i = 0; i <= 100-1; i++) {

                var du = result[i] == undefined ? false : result[i].dataValues 

                var calcPremio = calcPosRank(Rpremio, i)
                var positionR = PRCR[i].position;
                var calcRtp = () => {

                    if(result[i]){
                        return du.users_rtp
                    }else{
                        return 0;
                    }
                }

                var nickRank = () => {
                    if(result[i]){
                        return du.users_nick
                    }else{
                        return 0;
                    }
                }

                if(result[i]){
                    if(du.users_foto_url){
                        foto = du.users_foto_url
                    }else{
                        foto = process.env.APP_URL + 'no-foto.svg'
                    }
                }else{
                    foto = process.env.APP_URL + 'no-foto.svg'
                }

                RANK[i] = {
                    premio: calcPremio,
                    pos: positionR,
                    rtp: calcRtp(),
                    nick: nickRank(),
                    foto: foto
                };
            }

            return RANK
            
        } catch (error) {
            console.log('Erro ao GERAR RANKING: ' + error);
        }
    },//FIM DOS DADOS DE RANKIN -------------------
    tRTandTopicsBooks: async (tb,totalb, idb) => {

        if(tb=='rts'){
            for (i = 0; i <= totalb-1; i++) {

                const rss = await rTsch.count({ where: { 'rts_book_id': idb } })
                    
                return rss

            }
        }

        if(tb=='topics'){
            for (i = 0; i <= totalb-1; i++) {

                const rss = await sOcia.count({ where: { 'socials_book_id': idb } })
                    
                return rss
            
            }
        }
        
    },
    redirectDashb: (req, res, next) => {
        if (req.session.userId) {
            res.status(400).send({
                sessID: req.session.userId,
                redir: '/',
                message: 'USUÁRIO JÁ LOGADO.'
            })
        } else {
            next()
        }
    },
    redirectLogin: (req, res, next) => {
        if (!req.session.userId) {
            res.status(401).send({
                sessID: false,
                redir: '/login',
                message: 'POR FAVOR, FAÇA LOGIN.'
            })
        } else {
            next()
        }
    },
    validaEMAIL: async (req, res, next) => {
       
        try {
            const { nick, email } = req.body;

            //VALIDA NICKNAME E EMAIL ---------------    

            if(!validator.isEmpty(nick) && !validator.contains(nick, ' ') && validator.isLength(nick, { min: 5 })){

                if(validator.isEmail(email)){
    
                    const result = await dUser.findOne({
                        where: { [Op.or]: [{ 'users_nick': nick }, { 'users_email': email }] }
                    });
        
                    if(!result){
                        console.log('===============>>> NÃO ENCONTRADO');
                        return next()
                    }
                    if (result.users_email == email) {
                        console.log('EMAIL IGUAAAAAAAAAAAAAAAAAAAAAAL');
                        throw {msg: 'Email já em uso.'}
                    }
                    if (result.users_nick == nick) {
                        console.log('NICK IGUAAAAAAAAAAAAAAAAAAAAAAAAAL');
                        throw {msg: 'Nick já em uso.'}
                    }
                    
                    next()
                    
                
                }else{
                    throw {msg: 'Por favor, digite um email válido.'}
                }   
            }else{
                throw {msg: 'Por favor, digite um Nickname (ID) válido.'}
            }
    
        } catch (error) {
            res.status(400).send({error})
            console.log(error)
            return
        }
    },
    generateToken: (params = {}) => {
       return JWT.sign({id: params}, AUTH.SECRET, {expiresIn: 86400} )
    },
    generateTokenAdm: (params = {}) => {
        return JWT.sign({id: params}, AUTH.SECRET_ADM, {expiresIn: 86400} )
     },
    LikesCompls: async (tb, cat, idcat, iduser) => {

        if(iduser != 0){

            if(tb=='likes'){
                
                var r = await lIkes.count({where: { 'likes_category': cat, 'likes_iduser': iduser, 'likes_category_id': idcat}})

                if(r>=1){
                    return 1
                }else{
                    return 0
                }
                
            }
            if(tb=='complaints'){

                var r = await cOmpl.count({where: { 'complaints_category': cat, 'complaints_category_id': idcat, 'complaints_iduser': iduser}})

                if(r >= 1){
                    return 1
                }else{
                    return 0
                }
                 
            }

        }else{

            if(tb=='likes'){
                return await lIkes.count({where: { 'likes_category': cat, 'likes_category_id': idcat}})
            }
            if(tb=='complaints'){
                return await cOmpl.count({where: { 'complaints_category': cat, 'complaints_category_id': idcat}})
            }

        }
    }
    
}