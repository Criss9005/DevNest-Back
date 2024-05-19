const jwt = require('jsonwebtoken')
const moment = require('moment')

const ensureAuthenticated = (req, res, next) => { 
    if (!req.headers.authorization) { 
        return res.status(401).json({
            result: null,
            message: "Not authorized"
        })
    };
    
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN)

    if (payload.exp <= moment().unix) { 
        return res.status(401).json({
            result: null,
            message: "Not authorized"
        });
    }

    req.user = {
        idUser: payload.idUser,
        
    }; 

       
    next();
}

module.exports = {
    ensureAuthenticated
}