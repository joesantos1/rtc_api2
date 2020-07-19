const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {

    try {
        
        const authHeader = req.headers.authorization;

        if(!authHeader){
            res.status(401).send({error: 'NO TOKEN PROVIDED.'});
            return
        }

        const parts = authHeader.split(' ');

        if(!parts.length === 2){
            res.status(401).send({error: 'TOKEN ERROR.'});
            return
        }

        const [scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme)){
            res.status(401).send({error: 'TOKEN MALFORMATTED.'});
            return
        }

        jwt.verify(token, authConfig.SECRET, (err, decoded) => {
            if(err){ res.status(401).send({error: 'TOKEN INVÁLIDO.'}); return }

            req.userId = decoded.id;
        });

        return next();
        
    } catch (error) {
        res.status(401).send({errortoken: 'ERRO NA VERIFICAÇÃO DE TOKEN.'});
    }

    

}