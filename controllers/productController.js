const Product = require("../models/products");
const User = require("../models/users-schema");

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
  try {
    const { idUser } = req.user;
    const { height, desiredWeight, bloodType, age, currentWeight } = req.body;

    if (
      isNaN(height) ||
      isNaN(desiredWeight) ||
      isNaN(age) ||
      isNaN(currentWeight)
    ) {
      return res.status(400).json({ message: "Invalid input data" });
    }

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

    const nonRecommendedFoods = nonRecommendedFoodsList.map(
      (food) => food.title
    );

    const user = await User.findByIdAndUpdate(
      idUser,
      {
        $set: {
          "dailyIntake.dailyCalorieIntake": dailyCalorieIntake,
          "dailyIntake.nonRecommendedFoods": nonRecommendedFoods,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      dailyCalorieIntake: user.dailyIntake.dailyCalorieIntake,
      nonRecommendedFoods: user.dailyIntake.nonRecommendedFoods,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.searchFood = async (req, res) => {
  const { query } = req.query;
  const foods = await Product.find({ title: new RegExp(query, "i") });
  res.json(foods);
};
