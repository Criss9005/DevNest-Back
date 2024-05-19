const blackLits = require('../models/blackList-schema')

const isInBlackList = async (req, res, next) => { 
    try {
        //console.log(req.user.token, req.body.sid)
        const result = await blackLits.find({ token: req.user.token })
        
        
        if (result[0].token) {
            
            return res.status(404).json({
            result: null,
            message: "Invalid User / Invalid Session"
        })
        }
        if (req.body.sid) {
            const result1 = await blackLits.find({ sid: req.body.sid })
        
            if (result1[0].sid) {
                return res.status(404).json({
                    result: null,
                    message: "Invalid User / Invalid Session"
                })
            }
        };


    } catch (error) {
        
    }
      
    next();
}

module.exports = {
    isInBlackList
}