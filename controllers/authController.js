
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi') 

const {registerF, loginF, blackListToken, newPairOfTokens} = require('../models/auth.js')
const { ensureAuthenticated} = require("../middlewares/validate-jwt.js")
const { isInBlackList } = require("../middlewares/blacklistCheck.js")

const schema = Joi.object({
      
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})



const register = async (req, res) => {
   
  try {
        
        if (req.body.password && req.body.email) {
            const { error, value} = schema.validate({ password: req.body.password, email: req.body.email });
                if (error) {
                res.status(400).send({ message: error.message })
                
                } else { 
                    
                    const { success, user, message } = await registerF(req.body)
                    if (!success) {
                        return res.status(409).json({
                            message
                        })
                    }
        
                    return res.status(201).json({
                        user
                    })

                }
        }
        else { 
            res.status(400)
            res.json({ message: 'missing required fields' })
        }
  } catch (error) {
      
        return res.status(400).json({ message: 'missing required fields' })
        
    }

};

 const login = async (req, res) => {
 try {
        
        if (req.body.password && req.body.email) {
            const { error, value} = schema.validate({ password: req.body.password, email: req.body.email });
                if (error) {
                res.status(400).send({ message: error.message })
                
                } else { 
                    const {email, password } = req.body
                    const { success, result, message} = await loginF(email, password)
                    if (!success) {
                        return res.status(401).json({
                            message
                        })
                    }
                    
                  
                    
                    return res.status(200).json({
                        result
                    })


                }
        }
        else { 
            res.status(400)
            res.json({ message: 'missing required fields' })
        }
        } catch (error) {
        return res.status(409).json({ message: error.message})
        
    }
}; 

const logout = async (req, res, next) => {
 try {
        if (req.body.sid) {
            
        if (!req.user) { 
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        
        const data = {
            token: req.user.token,
            sid: req.body.sid
        }

        const { success } = await blackListToken(data)
        if (!success) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        
        return res.status(204).json('No content')
        } else {
            res.status(400)
            res.json({ message: 'missing required fields' })

        }
    } catch (error) {
        return res.status(409).json({ message: error.message })
        }
}; 

const refresh = async (req, res) => {
    try {
        if (req.body.sid) {

            const newPair = await newPairOfTokens(req.body.sid)
            if (!newPair) {
                return res.status(401).json({
                    message: "Not authorized"
                });
            }
            
            const data = {
                token: req.user.token,
                sid: req.body.sid
            };

            await blackListToken(data)

            return res.status(200).json({ data: newPair })

        }
        else {
            res.status(400)
            res.json({ message: 'missing required fields' })
        }
    } catch (error) {
        
    }
}
module.exports = {
    register, login, logout, refresh
}

