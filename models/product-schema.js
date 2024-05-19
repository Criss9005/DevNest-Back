const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
// const { checkout } = require("../routes/api/products");

const productSchema = new Schema(
  {
    calories: {
      type: Number,
    },
    category: {
      type: String,
    },
    weight: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  { collection: "products" }
);

productSchema.plugin(mongoosePaginate);
const products = mongoose.model("products", productSchema);
module.exports = products;
