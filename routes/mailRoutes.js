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
const fs = require('fs');
const path = require('path');
const mail = require('../modules/mailconfig');

const validator = require('validator');

const router = express.Router();


//ROTAS DE EMAIL

module.exports = router