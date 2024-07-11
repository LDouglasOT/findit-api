const router = require('express').Router();
const { registerUser, loginUser,generate,verify,getUser } = require("../Controllers/Authentication");

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


/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Generate otp code for both buyer and seller (seller or buyer)
 *     description: Generate otp code for both buyer and seller
 *     tags: [Authentication flow]
 *     responses:
 *       200:
 *         description: OTP sent successfully in successfully
 */
router.post('/otp', generate);

/**
 * @swagger
 * otp/verify:
 *   post:
 *     summary: Verify buyer ot[ code ]
 *     description: Generate otp code for both buyer and seller
 *     tags: [Authentication flow]
 *     responses:
 *       200:
 *         description: OTP sent successfully in successfully
 */
router.post('/otp/verify', verify);

router.post('/user', getUser);

module.exports = router;
