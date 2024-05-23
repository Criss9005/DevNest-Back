const todaySummary = require("./todaySummary-schema");

function getDate() {
  const today = new Date();

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  const localTime = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  );
  const day = addZero(localTime.getDate());
  const month = addZero(localTime.getMonth() + 1);
  const year = localTime.getFullYear();

  return `${day}-${month}-${year}`;
}

const getDailySummary = async (idUser, date) => {
  if (idUser && date) {
    const result = await todaySummary.find({ idUser, date });
    console.log(result);
    return { succes: true, data: result };
  }
  return { succes: false, message: "Empty fields." };
};

const deleteDailySummary = async (id) => {
  if (id) {
    const result = await todaySummary.findByIdAndDelete({ _id: id });
    return { succes: true, message: "Register removed", data: result };
  }
  return { succes: false, message: "Empty field id" };
};

const addToDailySummary = async (data) => {
  try {
    const { productName, grams, idUser, calories } = data;
    const daySummaryProduct = {
      productName,
      grams,
      idUser,
      date: getDate(),
      calories,
    };
    const result = await todaySummary.create(daySummaryProduct);
    return { succes: true, message: "Product added to daily summary", result };
  } catch (error) {
    return { succes: false, message: error };
  }
};

module.exports = { addToDailySummary, getDailySummary, deleteDailySummary };
