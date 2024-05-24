const User = require("../models/users-schema");

exports.getSavedDailyIntake = async (req, res) => {
  try {
    const user = await User.findById(req.user.idUser);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.dailyIntake);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
