const express = require('express');
const router = express.Router();
const { categories,getcategoriesbyId } = require("../Controllers/categories");

/**k
 * @swagger
 * tags:
 *   name: Products
 *   description: Products routes
 */

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

router.get('/categories', categories);


/**k
 * @swagger
 * tags:
 *   name: Products
 *   description: Products routes
 */

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

router.get('/categories/:id/:count', getcategoriesbyId);

module.exports = router;