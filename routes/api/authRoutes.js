const express = require("express");
const { register, login, logout, refresh, userData } = require("../../controllers/authController");
const { ensureAuthenticated } = require("../../middlewares/validate-jwt")
const {isInBlackList } = require("../../middlewares/blacklistCheck")

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: Mike
 *               email: mike@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: mike@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Bad request
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout session
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               sid: 1d1502ac852d29c670476ff808b2eaf3
 *               
 *     responses:
 *       204:
 *         description: Successful operation
 *       400:
 *         description: No token provided
 *       401:
 *         description: Unauthorized (invalid access token)
 *       404:
 *         description: Invalid user / Invalid session
 */
router.post("/logout", ensureAuthenticated, logout);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Get new pair of tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               sid: 1d1502ac852d29c670476ff808b2eaf3
 *               
 *     responses:
 *       204:
 *         description: Successful operation
 *       400:
 *         description: No token provided
 *       401:
 *         description: Unauthorized (invalid refresh token)
 *       404:
 *         description: Invalid user / Invalid session
 */
router.post("/refresh", ensureAuthenticated, isInBlackList, refresh);


/**
 * @swagger
 * /api/auth/userdata:
 *   put:
 *     summary: Refresh data when the user is logged in
 *     tags: [Auth]
 *     requestBody: Id from the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *             example:
 *               sid: 1d1502ac852d29c670476ff808b2eaf3
 *               
 *     responses:
 *       204:
 *         description: Successful operation
 *       400:
 *         description: No token provided
 *       401:
 *         description: Unauthorized (invalid refresh token)
 *       404:
 *         description: Invalid user / Invalid session
 */
router.put("/userdata", ensureAuthenticated, isInBlackList, userData);

module.exports = router;