const express = require("express");
const {
  addToDaylySummary,
  getDaylySummary,
  deleteDaylySummary,
} = require("../../models/todaySummary");
const todaySummaryRouter = express.Router();

todaySummaryRouter.get("/:idUser/:date", async (req, res) => {
  const { idUser, date } = req.params;
  const result = await getDaylySummary(idUser, date);
  if (result.succes) res.status(200).send(result.data);
  else res.status(404).json({ message: result.message });
});

todaySummaryRouter.post("/addSummary", async (req, res) => {
  const { productName, grams, idUser } = req.body;
  const productSummary = {
    productName,
    grams,
    idUser,
  };
  const result = await addToDaylySummary(productSummary);
  if (result.succes) res.status(201).json(result.message);
  else res.status(400).json(result.message);
});

todaySummaryRouter.delete("/addSummary/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id + "id");
  const result = await deleteDaylySummary(id);
  if (result.succes)
    res.status(200).json({ message: result.message, data: result.data });
  else res.status(404).json({ message: result.message });
});

module.exports = todaySummaryRouter;
