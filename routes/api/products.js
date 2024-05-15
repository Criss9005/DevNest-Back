const express = require("express");
const { listProducts, addProductsOfTheDay } = require("../../models/products");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  const users = await listProducts();
  res.status(200).send(users);
});

productsRouter.post("/products/day"),
  async (req, res) => {
    const { foods, dateOfRegister } = req.body;
    const infoOfTheDay = {
      foods,
      dateOfRegister,
    };
  };

module.exports = productsRouter;
