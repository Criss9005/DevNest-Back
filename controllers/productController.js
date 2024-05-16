const Product = require("../models/products");
const User = require("../models/user");

exports.getDailyIntakePublic = async (req, res) => {
  const { height, desiredWeight, bloodType, age, currentWeight } = req.query;

  const dailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight); // Calculo de las calorias

  const nonRecommendedFoods = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  });

  res.json({
    dailyCalorieIntake: `Your recommended daily calorie intake is: ${dailyCalorieIntake} kcl`,
    nonRecommendedFoods,
  });
};

exports.getDailyIntakePrivate = async (req, res) => {
  const { height, desiredWeight, bloodType, age, currentWeight } = req.body;

  const dailyCalorieIntake =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const nonRecommendedFoods = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  });

  // Save to database
  const user = await User.findById(req.user.id);
  user.dailyIntake = { dailyCalorieIntake, nonRecommendedFoods };
  await user.save();

  res.json({
    dailyCalorieIntake: `Your recommended daily calorie intake is: ${dailyCalorieIntake} kcl`,
    nonRecommendedFoods,
  });
};

exports.searchFood = async (req, res) => {
  const { query } = req.query;
  const foods = await Product.find({ title: new RegExp(query, "i") });
  res.json(foods);
};
