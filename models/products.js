const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  categories: { type: String, required: true },
  weight: { type: Number, required: true },
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  groupBloodNotAllowed: [Boolean],
});

module.exports = mongoose.model("Product", ProductSchema);
