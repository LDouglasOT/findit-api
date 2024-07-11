const express = require('express');
const router = express.Router();
const { 
    createShop,
    getAllShops, 
    getShopById,
    updateShopById,
    deleteShopById,
    getTrendingShops,
    myShop,
    searchVendorProducts,
    FetchShop 
} = require("../Controllers/Shops");
const { authenticate } = require("../middleware/Authentication");
const multer = require('multer');
const upload = multer();

/**k
 * @swagger
 * tags:
 *   name: Shops
 *   description: Shop routes
 */

/**
 * @swagger
 * /shop/create:
 *   post:
 *     summary: Create a new shop
 *     description: Create a new shop with provided details
 *     tags: [Shops]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopName:
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
 *         description: Shop created successfully
 */

router.post('/shop/create',authenticate,upload.array('userImages'), createShop);

/**
 * @swagger
 * /shop/getall:
 *   get:
 *     summary: Get all shops
 *     description: Retrieve a list of all shops
 *     tags: [Shops]
 *     responses:
 *       200:
 *         description: List of shops retrieved successfully
 */

router.get('/shop/getall', getAllShops);

/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: Get shop by ID
 *     description: Retrieve details of a shop by its ID
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shop details retrieved successfully
 */

router.get('/shop/:id',authenticate, getShopById);

/**
 * @swagger
 * /shop/{id}:
 *   post:
 *     summary: Update shop by ID
 *     description: Update details of a shop by its ID
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopName:
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
 *         description: Shop updated successfully
 */

router.post('/shop/:id',authenticate, updateShopById);

/**
 * @swagger
 * /shop/{id}:
 *   delete:
 *     summary: Delete shop by ID
 *     description: Delete a shop by its ID
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 */

router.delete('/shop/:id',authenticate, deleteShopById);


/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: Trending shops list
 *     description: Trending shops list
 *     tags: [trending Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shops
 */

router.get('/shops/trending', getTrendingShops);

/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: My shop
 *     description: This fetches the shop of the user
 *     tags: [My Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shops
 */

router.get('/shop/search/:query/:vendor', searchVendorProducts);

/**
 * @swagger
 * /shop/{id}:
 *   get:
 *     summary: My shop
 *     description: This fetches the shop of the user
 *     tags: [My Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shops
 */

router.get('/user/shop/:id',authenticate, myShop);

/**
 * @swagger
 * /vendor/product/{id}:
 *   get:
 *     summary: Get a shop
 *     description: This fetches the shop of the user
 *     tags: [My Shops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: fetch a specific shop
 */
router.get('/vendor/product/:id', FetchShop);


module.exports = router;
