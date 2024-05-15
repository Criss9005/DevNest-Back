const express = require('express')
const {register, login, logout, removeToken, updateSub} = require('../../models/auth')
const authRouter = express.Router();
const Joi = require('joi') 
const { ensureAuthenticated} = require("../../middlewares/validate-jwt.js")
const gravatar = require('gravatar')

const schema = Joi.object({
      
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

authRouter.post('/register', async (req, res, next) => {
    try {
        
        if (req.body.password && req.body.email) {
            const { error, value} = schema.validate({ password: req.body.password, email: req.body.email });
                if (error) {
                res.status(400).send({ message: error.message })
                
                } else { 
                    req.body.avatarURL = gravatar.url(req.body.email);
                    const { success, user, message } = await register(req.body)
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
        return res.status(409).json({ message: "Email in use" })
        
    }
    
})


authRouter.post('/login', async (req, res, next) => {
    try {
        
        if (req.body.password && req.body.email) {
            const { error, value} = schema.validate({ password: req.body.password, email: req.body.email });
                if (error) {
                res.status(400).send({ message: error.message })
                
                } else { 
                    const {email, password } = req.body
                    const { success, result, message, token } = await login(email, password)
                    if (!success) {
                        return res.status(401).json({
                            message
                        })
                    }
                    
                  
                    
                    return res.status(200).json({
                        result, token
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
    
})

authRouter.get('/logout', ensureAuthenticated, async (req, res, next) => {
    try {
        if (!req.user) { 
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        const { success } = await logout(req.user.idUser)
        if (!success) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }
        
        await removeToken(req.user.idUser)
        return res.status(204).json('No Content')
        
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
});

authRouter.get('/refresh', ensureAuthenticated, async (req, res, next) => {
  
  res.status(200).json({
    status: 'success',
    data: {
        message: `Authorization was successful`,
        result: req.user
    },
  });
});

module.exports = authRouter
