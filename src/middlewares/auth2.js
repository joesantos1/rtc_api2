const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        
        const authHeader = req.body.token;

        if(!authHeader){
            res.status(401).send({error: 'NO TOKEN PROVIDED.'});
            return
        }

        jwt.verify(authHeader, process.env.SECRET2, (err, decoded) => {
            if(err){ res.status(401).send({error: 'TOKEN INVÁLIDO.'}); return }

            req.userId = decoded.id;
        });

        return next();
        
    } catch (error) {
        res.status(401).send({errortoken: 'ERRO NA VERIFICAÇÃO DE TOKEN.'});
    }
}