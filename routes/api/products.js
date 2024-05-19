const express = require('express')
const {listProducts } = require('../../models/products')
const productsRouter = express.Router();
const {ensureAuthenticated } = require('../../middlewares/validate-jwt')
const { isInBlackList} = require('../../middlewares/blacklistCheck')
    

productsRouter.get('/', ensureAuthenticated, isInBlackList, async (req, res, next) => {
  
      const users = await listProducts()
      res.status(200).send(users)
      
})

module.exports = productsRouter
