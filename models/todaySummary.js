const todaySummary = require("./todaySummary-schema");

function getDate() {
  const today = new Date();

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  const day = addZero(today.getDate());
  const month = addZero(today.getMonth() + 1);
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

const getDaylySummary = async (idUser, date) => {
  if (idUser && date) {
    const result = await todaySummary.find({ idUser, date });
    console.log(result);
    return { succes: true, data: result };
  }
  return { succes: false, message: "Empty fields." };
};

const deleteDaylySummary = async (id) => {
  if (id) {
    const result = await todaySummary.findByIdAndDelete({ _id: id });
    return { succes: true, message: "Register removed", data: result };
  }
  return { succes: false, message: "Empty field id" };
};

const addToDaylySummary = async (data) => {
  try {
    const { productName, grams, idUser } = data;
    const daySummaryProduct = {
      productName,
      grams,
      idUser,
      date: getDate(),
    };
    const result = await todaySummary.create(daySummaryProduct);
    console.log(result + "result");
    return { succes: true, message: "Product added to dayly summary" };
  } catch (error) {
    console.log(error);
    return { succes: false, message: error };
  }
};

module.exports = { addToDaylySummary, getDaylySummary, deleteDaylySummary };
