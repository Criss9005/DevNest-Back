const express = require("express");
const {
  getDailyIntakePublic,
  getDailyIntakePrivate,
  searchFood,
} = require("../../controllers/productController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/public/daily-intake", getDailyIntakePublic);
router.post("/private/daily-intake", authMiddleware, getDailyIntakePrivate);
router.get("/search", searchFood);

module.exports = router;
