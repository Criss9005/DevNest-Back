const express = require('express')
const { ensureAuthenticated} = require("../../middlewares/validate-jwt.js")
const Joi = require('joi') 
const {favContacts, listContacts, getContactById, removeContact,  addContact, updateContact, updateStatusContact } = require('../../models/contacts.js')
const ConctactRouter = express.Router();


const schema = Joi.object({
    name: Joi.string()
         .min(3)
         .max(30)
         .required(),

    phone: Joi.number()
        .integer()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    

ConctactRouter.get('/', ensureAuthenticated, async (req, res, next) => {
  const { favorite } = req.body
  
  if (!favorite) {
    const users = await listContacts(req.user.idUser)
    res.status(200).send(users)
    
  } else { 
    const fav = await favContacts(req.user.idUser)
    res.status(200).send(fav)
  }
  

  
  
})

ConctactRouter.get('/:contactId', ensureAuthenticated, async (req, res, next) => {

  const user = await getContactById(req.params.contactId, req.user.idUser)
  if (user != null) {
    res.status(200).send(user)

  } else { 
    res.status(404)
    res.json({ message: 'Not Found' })
  }
})

ConctactRouter.post('/', ensureAuthenticated, async (req, res, next) => {
  
  if (req.body.name && req.body.email && req.body.phone) {
    const { error, value} = schema.validate({ name: req.body.name, phone: req.body.phone, email: req.body.email });
    if (error) {
      res.status(400).send({ message: error.message })
      
    } else { 
      req.body.owner = req.user.idUser
      const contact= await addContact(req.body)
      res.status(201).send({ message: 'Contacto Creado exitosamente', contact: contact })

    }
  }
  else { 
    res.status(400)
    res.json({ message: 'missing required name field' })
  }
})

ConctactRouter.delete('/:contactId', ensureAuthenticated, async (req, res, next) => {
  const result = await removeContact(req.params.contactId)

  if (result != null) {
    res.status(200).send({ message: 'contacto eliminado' })
  }
  else { 
    res.status(404).send({ message: 'Not Found' })
  }
})

ConctactRouter.put('/:contactId', ensureAuthenticated, async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const { error, value} = schema.validate({ name: req.body.name, phone: req.body.phone, email: req.body.email });
    if (error) {
      res.status(404).send({ message: error.message })
    }
    else { 
      const result = await updateContact(req.params.contactId, req.body)
      if (result != null) {
        res.status(200).send({ messege: 'Update Conctact Completed', contact: { id: req.params.contactId, name: req.body.name, email: req.body.email, phone: req.body.phone } })
          
        }
        else { 
          res.status(404).send({ message: 'Id not found' })
          
  }
      
    }

  }
  else { 
    res.status(404).send({ message: 'missing fields' })
  }

  
})

ConctactRouter.patch('/:contactId', ensureAuthenticated, async (req, res, next) => {
  if (req.body.favorite) { 

    const result = await updateStatusContact(req.params.contactId, req.body.favorite)
    if (result != null) {
      res.status(200).send({ messege: 'Update Conctact Completed' })
        
    }
    else { 
        res.status(404).send({ message: 'Not found' })
    }
  }
  else { 
    res.status(404).send({ message: 'missing field favorite' })
  }
 
})


module.exports = ConctactRouter
