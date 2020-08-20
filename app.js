require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
//const session = require('express-session');
const cors = require('cors')
const path = require('path')

const app = express();

app.use(cors({origin: ["http://rtchamp.com", /\.rtchamp\.com$/, "http://localhost:8080"]}));

//REDIRECT UMBLER
app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

const router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//CHAMADA DE ROTAS
const rotasUser = require('./routes/userRoutes');
const rotasAdm = require('./routes/admiRoutes');
const rotasMail = require('./routes/mailRoutes')

//UPLOAD TEMPORARIOS
app.use('/files', express.static(path.resolve(__dirname, "tmp", "uploads")))

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
router.use('/', rotasAdm);
router.use('/', rotasMail);

app.use('/', router);

module.exports = app;