const express = require('express');
const router = express.Router();
const {authenticate} = require("../middleware/Authentication");
const { purchaseCredit} =  require("../Controllers/Shops");

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
router.post('/credit', authenticate,purchaseCredit);


module.exports = router;