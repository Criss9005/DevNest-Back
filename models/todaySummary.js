const todaySummary = require("./todaySummary-schema");

const getDaylySummary = async (idUser, date) => {
  const result = await todaySummary.find({ idUser, date });
  return result;
};

const deleteDaylySummary = async (id) => {
  const result = await todaySummary.findByIdAndDelete({ _id: id });
  return result;
};

const addToDaylySummary = async (data) => {
  try {
    const { productName, grams, idUser, dateOfRegister: date } = data;
    const daySummaryProduct = {
      productName,
      grams,
      idUser,
      date,
    };
    await todaySummary.create(daySummaryProduct);
    return { succes: true, message: "Product added to dayly summary" };
  } catch (error) {
    return { succes: false, message: error };
  }
};

module.exports = { addToDaylySummary, getDaylySummary, deleteDaylySummary };
