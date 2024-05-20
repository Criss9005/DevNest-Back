const express = require("express");
const {
  dailySummary,
  createDailySumary,
  deleteDailySummary,
} = require("../../controllers/todaySummaryController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Today Summary
 *   description: Today Summary related endpoints
 */

/**
 * @swagger
 * /api/todaySummary/{idUser}/{date}:
 *   get:
 *     summary: Get daily summary
 *     tags: [Today Summary]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Date for the summary
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *       400:
 *         description: Bad request
 */
router.get("/:idUser/:date", dailySummary);

/**
 * @swagger
 * /api/todaySummary/addSummary:
 *   post:
 *     summary: Register a new daily summary
 *     tags: [Today Summary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               grams:
 *                 type: number
 *               idUser:
 *                 type: string
 *             example:
 *               productName: orange
 *               grams: 300
 *               idUser: 6644fa419ed07074a1b077a2
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/addSummary", createDailySumary);

/**
 * @swagger
 * /api/todaySummary/addSummary/{id}:
 *   delete:
 *     summary: Delete register of daily summary
 *     tags: [Today Summary]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the summary to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       400:
 *         description: Bad request
 */
router.delete("/addSummary/:id", deleteDailySummary);

module.exports = router;
