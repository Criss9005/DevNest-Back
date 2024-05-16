const express = require("express");
const {
  addToDaylySummary,
  getDaylySummary,
  deleteTodaySummary,
} = require("../../models/todaySummary");
const todaySummaryRouter = express.Router();

todaySummaryRouter.get("/", async (req, res) => {
  const { idUser, date } = req.body;
  const result = await getDaylySummary(idUser, date);
  if (result) res.status(200).json({ message: "found some data", result });
  else res.status(404).json({ message: "not data found" });
});

todaySummaryRouter.post("/addSummary", async (req, res) => {
  const { productName, grams, idUser, dateOfRegister } = req.body;
  const productSummary = {
    productName,
    grams,
    idUser,
    dateOfRegister,
  };
  const result = addToDaylySummary(productSummary);
  if (result.succes) res.status(201).json(result);
  res.status(400).json(result);
});

todaySummaryRouter.delete("/addSummary", async (req, res) => {
  const { id } = req.body;
  const result = await deleteTodaySummary(id);
  if (result) res.status(200).json({ message: "deleted successfully", result });
});

module.exports = todaySummaryRouter;
