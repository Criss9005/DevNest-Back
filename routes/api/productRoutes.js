const express = require("express");
const {
  getDailyIntakePublic,
  getDailyIntakePrivate,
  searchFood,
} = require("../../controllers/productController");
const { getSavedDailyIntake } = require("../../controllers/userController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/public/daily-intake", getDailyIntakePublic);
router.post("/private/daily-intake", authMiddleware, getDailyIntakePrivate);
router.get("/search", searchFood);
router.get("/private/saved-daily-intake", authMiddleware, getSavedDailyIntake);

module.exports = router;
