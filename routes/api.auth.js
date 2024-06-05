const router = require('express').Router();
const { registerUser, loginUser } = require("../Controllers/Authentication");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication routes
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user (seller or buyer)
 *     description: Register a new user (seller or buyer)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to a user's account (seller or buyer)
 *     description: Login to a user's account (seller or buyer)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post('/login', loginUser);

module.exports = router;
