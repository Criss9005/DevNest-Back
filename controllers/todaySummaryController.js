const {
  addToDailySummary,
  getDailySummary,
  deleteDailySummary,
} = require("../models/todaySummary");

exports.dailySummary = async (req, res) => {
  const { idUser, date } = req.params;
  const result = await getDailySummary(idUser, date);
  if (result.succes) res.status(200).json(result.data);
  else res.status(404).json({ message: result.message });
};

exports.createDailySumary = async (req, res) => {
  const { productName, grams, idUser } = req.body;
  const productSummary = {
    productName,
    grams,
    idUser,
  };
  const result = await addToDailySummary(productSummary);
  if (result.succes) res.status(201).json(result.message);
  else res.status(400).json(result.message);
};

exports.deleteDailySummary = async (req, res) => {
  const { id } = req.params;
  console.log(id + "id");
  const result = await deleteDailySummary(id);
  if (result.succes)
    res.status(200).json({ message: result.message, data: result.data });
  else res.status(404).json({ message: result.message });
};
