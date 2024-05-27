const express = require("express");
const {
  getDailyIntakePublic,
  getDailyIntakePrivate,
  searchFood,
} = require("../../controllers/productController");
const { getSavedDailyIntake } = require("../../controllers/userController");
const { ensureAuthenticated } = require("../../middlewares/validate-jwt");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products related endpoints
 */

/**
 * @swagger
 * /api/products/public/daily-intake:
 *   get:
 *     summary: Get daily calorie intake and non-recommended products (public)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: height
 *         schema:
 *           type: number
 *         required: true
 *         description: Height of the user
 *       - in: query
 *         name: desiredWeight
 *         schema:
 *           type: number
 *         required: true
 *         description: Desired weight of the user
 *       - in: query
 *         name: bloodType
 *         schema:
 *           type: number
 *         required: true
 *         description: Blood type of the user
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *         required: true
 *         description: Age of the user
 *       - in: query
 *         name: currentWeight
 *         schema:
 *           type: number
 *         required: true
 *         description: Current weight of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved daily intake
 *       400:
 *         description: Bad request
 */
router.get("/public/daily-intake", getDailyIntakePublic);

/**
 * @swagger
 * /api/products/private/daily-intake:
 *   post:
 *     summary: Get daily calorie intake and non-recommended products (private)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 description: Height of the user
 *                 example: 170
 *               desiredWeight:
 *                 type: number
 *                 description: Desired weight of the user
 *                 example: 65
 *               bloodType:
 *                 type: number
 *                 description: Blood type of the user
 *                 example: 2
 *               age:
 *                 type: number
 *                 description: Age of the user
 *                 example: 30
 *               currentWeight:
 *                 type: number
 *                 description: Current weight of the user
 *                 example: 80
 *     responses:
 *       200:
 *         description: Successfully retrieved and saved daily intake
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyCalorieIntake:
 *                   type: number
 *                   description: Calculated daily calorie intake
 *                   example: 2000
 *                 nonRecommendedFoods:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of non-recommended foods
 *                   example: ["Bread", "Pasta"]
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post(
  "/private/daily-intake",
  ensureAuthenticated,
  getDailyIntakePrivate
);

/**
 * @swagger
 * /api/products/private/saved-daily-intake:
 *   get:
 *     summary: Get saved daily intake for the authenticated user
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved saved daily intake
 *       404:
 *         description: User not found
 */
router.get(
  "/private/saved-daily-intake",
  ensureAuthenticated,
  getSavedDailyIntake
);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products in the database
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 *     responses:
 *       200:
 *         description: Successfully retrieved food items
 *       400:
 *         description: Bad request
 */
router.get("/search", searchFood);

module.exports = router;
