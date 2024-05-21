const Product = require("../models/products");
const User = require("../models/user");

exports.getDailyIntakePublic = async (req, res) => {
  const { height, desiredWeight, bloodType, age, currentWeight } = req.query;

  const dailyCalorieIntake = Math.ceil(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  ); // Calculo de las calorias

  const nonRecommendedFoodsList = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  })
    .limit(4)
    .select("title");

  const nonRecommendedFoods = nonRecommendedFoodsList.map((food) => food.title);

  res.json({
    dailyCalorieIntake: `${dailyCalorieIntake} kcl`,
    nonRecommendedFoods,
  });
};

exports.getDailyIntakePrivate = async (req, res) => {
  const { height, desiredWeight, bloodType, age, currentWeight } = req.body;

  const dailyCalorieIntake = Math.ceil(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  const nonRecommendedFoodsList = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: true,
  })
    .limit(4)
    .select("title");

  const nonRecommendedFoods = nonRecommendedFoodsList.map((food) => food.title);

  // Save to database
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.dailyIntake = {
      dailyCalorieIntake: dailyCalorieIntake,
      nonRecommendedFoods,
    };

    await user.save();

    res.json({
      dailyCalorieIntake: `${dailyCalorieIntake} kcl`,
      nonRecommendedFoods,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.searchFood = async (req, res) => {
  const { query } = req.query;
  const foods = await Product.find({ title: new RegExp(query, "i") });
  res.json(foods);
};
