const express = require('express');
const router = express.Router();
const { PlaceOrder } = require("../Controllers/Orders");
const { authenticate } = require("../middleware/Authentication");
/**
 * @swagger
 * /Products/create:
 *   post:
 *     summary: Create a new Products
 *     description: Create a new Products with provided details
 *     tags: [Products]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductsName:
 *                 type: string
 *               profile:
 *                 type: string
 *               subscription:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               loginId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Products created successfully
 */

router.post('/orders', PlaceOrder);


module.exports = router;