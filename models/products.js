const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  categories: { type: String, required: true },
  weight: { type: Number, required: true },
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  groupBloodNotAllowed: [Boolean],
});

module.exports = mongoose.model("Product", ProductSchema);

/* const products = require("./product-schema");

const paginationOptions = {
  page: 1,
  limit: 20,
};

const listProducts = async () => {
  // const result = await Contact.find({owner: ownerId})
  const result = await products.paginate({}, paginationOptions);
  return result;
};

module.exports = {
  listProducts,
};
 */