const express = require('express')
const {listProducts } = require('../../models/products')
const productsRouter = express.Router();

    

productsRouter.get('/', async (req, res, next) => {
  
      const users = await listProducts()
      res.status(200).send(users)
      
})

module.exports = productsRouter
