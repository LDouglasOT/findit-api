const express = require('express');
const router = express.Router();
const { createProducts, getAllProducts, getProductsById, updateProductsById, deleteProductsById,updateproduct,addproduct } = require("../Controllers/Products");
const { searchProducts,getPopularProducts,getReviews,CreateReview } = require("../Controllers/search");
const multer = require('multer');
const { authenticate } = require('../middleware/Authentication');
const { categoryProducts }=require("../Controllers/categories")
const upload = multer();


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

router.post('/products/create',upload.array('userImages'), createProducts);

/**
 * @swagger
 * /Products/getall:
 *   get:
 *     summary: Get all Products
 *     description: Retrieve a list of all Products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of Products retrieved successfully
 */

router.get('/products/getall', getAllProducts);

/**
 * @swagger
 * /Products/{id}:
 *   get:
 *     summary: Get Products by ID
 *     description: Retrieve details of a Products by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products details retrieved successfully
 */

router.get('/products/search/:id', getProductsById);

/**
 * @swagger
 * /Products/{id}:
 *   post:
 *     summary: Update Products by ID
 *     description: Update details of a Products by its ID
 *     tags: [Products]
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
 *         description: Products updated successfully
 */

router.post('/products/update/:id', updateProductsById);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete Products by ID
 *     description: Delete a Products by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products deleted successfully
 */

router.delete('/product/delete/:id', deleteProductsById);

/**
 * @swagger
 * /product/{id}:
 *   search:
 *     summary: Search
 *     description: Search Products by Name and ShopName
 *     tags: [Search Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products
 */

router.post('/products/search', searchProducts);

/**
 * @swagger
 * /product/{id}:
 *   search:
 *     summary: Special offer products
 *     description: Search Products by with special offer
 *     tags: [Special offer Products]
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: Products
 */
router.get('/products/trending', getPopularProducts);

/**
 * @swagger
 * /product/reviews/{id}:
 *   search:
 *     summary: Special offer Reviews
 *     description: Search Reviews by with special offer
 *     tags: [Special offer Reviews]
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: Reviews
 */
router.get('/products/reviews/:id', getReviews);

/**
 * @swagger
 * /product/reviews/create/:
 *   search:
 *     summary: create Reviews
 *     description: create Reviews
 *     tags: [Special offer Reviews]
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: Reviews
 */
router.post('/reviews/create/', CreateReview);

router.post("/product/update",upload.array('userImages'),updateproduct)

router.post("/product/add",upload.array('userImages'),authenticate,addproduct)


router.post("/category/:category",categoryProducts)

module.exports = router;
