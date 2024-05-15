const products = require('./product-schema')

const paginationOptions = {
  page: 1,
  limit: 20,
}


const listProducts = async () => {
  //const result = await Contact.find({owner: ownerId})
  const result = await products.paginate({}, paginationOptions)
  return result
}

module.exports = {
  listProducts,
  
}
