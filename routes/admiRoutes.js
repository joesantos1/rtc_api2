const express = require('express');
const dBook = require('../models/dadosBook');

const router = express.Router();

router.get('/cadquest', async (req, res) => {

    /*
   await dBook.findAll({
        order: [['book_titulo', 'ASC']]
    }).then(bks => {
        res.status(200).send({ lista1: bks });
    }).catch(function (erro) {
        console.log('Erro ao carregar os livros: ' + erro);
    })
    */
});

//AQUI VAI UM TESTE

module.exports = router