const express = require('express');
const bodyParser = require('body-parser');
//const session = require('express-session');
const cors = require('cors')

const app = express();

const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const rotasUser = require('./routes/userRoutes');
const rotasAdm = require('./routes/admiRoutes');

//CONFIGURAÇÕES DE SESSAO
/*
const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    SESS_NAME = 'SID',
    NODE_ENV = 'development',
    SESS_LIFETIME = TWO_HOURS,
    SESS_SECRET = 'ssh!quzziet,it\'asecret!'
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}))
*/
//FIM DAS CONFIGURAÇÕES DE SESSAO

router.use('/', rotasUser);
router.use('/cadquest', rotasAdm);

app.use('/api', router);

module.exports = app;